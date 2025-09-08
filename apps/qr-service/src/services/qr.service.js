// QR Code Service:
//  Generates QR codes based on user input (links, text, etc.).
//  Stores QR code metadata.
//  Manages QR code statistics (scans, etc. - if you want to track this).
//  Provides API endpoints for creating, retrieving, updating, and deleting QR codes.


const QRCode = require('qrcode');
const { v4: uuidv4 } = require('uuid');
// const { QRCodeModel, WebPage, QRScan } require('../models');
const FileService = require('../services/file.service');
const logger = require('../../shared/utils/logger');
const { Op } = require('sequelize');


class QrService {
  constructor () {
    // this.baseUrl = process.env.BASE_URL || 'https://ourplatform.com';
    this.baseUrl = process.env.BASE_URL || 'http://localhost:8080';
  }

  // Create QR code with web page integration
  async createQRCode (userId, qrData) {
    try {
      const {name, destinationType, destinationUrl, pageContent, custormDesign } = qrData;

      // Generate unique identifier for the QR code
      const qrId = uuidv4();
      let finalDestinationUrl = destinationUrl;

      // if creating a web page, generate platform URL
      if (destinationType === 'webpage') {
        finalDestinationUrl = `${this.baseUrl}/page/${qrId}`;
      }

      // Generate QR code image
      const qrCodeBuffer = await QRCode.toBuffer(finalDestinationUrl, {
        type: 'png',
        width: 512,
        margin: 2,
        color: {
          dark: custormDesign.color || '#000000',
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'M'
      });

      // Upload QR image to file service
      const qrImageUrl = await FileService.uploadBuffer(
        qrCodeBuffer,
        `qr-${qrId}.png`,
        'image/png'
      );

      // Create QR code record
      const qrCode = await QRCodeModel.create({
        id: qrId,
        user_id: userId,
        name,
        qr_data: finalDestinationUrl,
        qr_image_url: qrImageUrl,
        destination_url: finalDestinationUrl,
        is_active: true
      });

      // Create web page if needed
      if (destinationType === 'webpage' && pageContent) {
        await WebPage.create({
          qr_code_id: qrId,
          title: pageContent.title || name,
          content: pageContent,
          template_id: pageContent.templateId || 'default',
          custom_css: pageContent.customCss,
          meta_data: pageContent.metaData || {},
          is_published: true
        });
      }

      logger.info(`QR code created successfully: ${qrId}`);
      return qrCode;

    } catch (error) {
      logger.error('QR code creation failed:', error);
      throw new Error('QR_CREATION_FAILED');
    }
  }

  // Get user's QR codes with pagination and filtering
  async getUserQRCodes(userId, options = {}) {
    try {
      const { page = 1, limit = 10, search, isActive } = options;
      const offset = (page - 1) * limit;

      const whereClause = { user_id: userId };

      if (search) {
        whereClause.name = { [Op.iLike]: `%${search}%` };
      }

      if (isActive !== undefined) {
        whereClause.is_active = isActive;
      }

      const { rows: qrCodes, count } = await QRCodeModel.findAndCountAll({
        where: whereClause,
        include: [
          {
            model: WebPage,
            as: 'webPage',
            attributes: ['title', 'is_published']
          }
        ],
        order: [['created_at', 'DESC']],
        limit: parseInt(limit),
        offset: parseInt(offset)
      });

      return {
        qrCodes,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(count / limit),
          totalItems: count,
          itemsPerPage: limit
        }
      };

    } catch (error) {
      logger.error('Failed to fetch QR codes:', error);
      throw new Error('QR_FETCH_FAILED');
    }
  }


  // Update QR code with regeneration if URL changes
  async updateQRCode(qrId, userId, updateData) {
    try {
      const qrCode = await QRCodeModel.findOne({
        where: { id: qrId, user_id: userId }
      });

      if (!qrCode) {
        throw new Error('QR_NOT_FOUND');
      }

      const { name, destinationUrl, customDesign } = updateData;
      let needsRegeneration = false;

      // Check if destination URL changed
      if (destinationUrl && destinationUrl !== qrCode.destination_url) {
        qrCode.destination_url = destinationUrl;
        qrCode.qr_data = destinationUrl;
        needsRegeneration = true;
      }

      // Update name if provided
      if (name) {
        qrCode.name = name;
      }

      // Regenerate QR code image if needed
      if (needsRegeneration || customDesign) {
        const qrCodeBuffer = await QRCode.toBuffer(qrCode.qr_data, {
          type: 'png',
          width: 512,
          margin: 2,
          color: {
            dark: customDesign?.color || '#000000',
            light: '#FFFFFF'
          },
          errorCorrectionLevel: 'M'
        });

        // Delete old QR image
        if (qrCode.qr_image_url) {
          await FileService.deleteFile(qrCode.qr_image_url);
        }

        // Upload new QR image
        const newQrImageUrl = await FileService.uploadBuffer(
          qrCodeBuffer,
          `qr-${qrId}.png`,
          'image/png'
        );

        qrCode.qr_image_url = newQrImageUrl;
      }

      await qrCode.save();
      logger.info(`QR code updated: ${qrId}`);

      return qrCode;

    } catch (error) {
      logger.error('QR code update failed:', error);
      throw error;
    }
  }


  // Track QR code scan with analytics
  async trackQRScan(qrId, scanData) {
    try {
      const { ipAddress, userAgent, referer, locationData } = scanData;

      // Increment scan count
      await QRCodeModel.increment('scan_count', {
        where: { id: qrId, is_active: true }
      });

      // Record detailed scan data
      await QRScan.create({
        qr_code_id: qrId,
        ip_address: ipAddress,
        user_agent: userAgent,
        referer,
        location_data: locationData
      });

      logger.info(`QR scan tracked: ${qrId}`);

    } catch (error) {
      logger.error('QR scan tracking failed:', error);
      // Don't throw error to avoid disrupting user experience
    }
  }

  // Get QR analytics with date filtering
  async getQRAnalytics(qrId, userId, dateRange = {}) {
    try {
      const qrCode = await QRCodeModel.findOne({
        where: { id: qrId, user_id: userId }
      });

      if (!qrCode) {
        throw new Error('QR_NOT_FOUND');
      }

      const { startDate, endDate } = dateRange;
      const whereClause = { qr_code_id: qrId };

      if (startDate && endDate) {
        whereClause.scanned_at = {
          [Op.between]: [new Date(startDate), new Date(endDate)]
        };
      }

      // Get scan details
      const scans = await QRScan.findAll({
        where: whereClause,
        attributes: ['ip_address', 'location_data', 'scanned_at'],
        order: [['scanned_at', 'DESC']]
      });

      // Aggregate data
      const analytics = {
        totalScans: qrCode.scan_count,
        periodScans: scans.length,
        uniqueVisitors: new Set(scans.map(scan => scan.ip_address)).size,
        scansByDay: this.aggregateScansByDay(scans),
        topLocations: this.aggregateTopLocations(scans),
        recentScans: scans.slice(0, 10)
      };

      return analytics;

    } catch (error) {
      logger.error('Analytics fetch failed:', error);
      throw error;
    }
  }


  // Helper method to aggregate scans by day
  aggregateScansByDay(scans) {
    const scansByDay = {};

    scans.forEach(scan => {
      const day = scan.scanned_at.toISOString().split('T')[0];
      scansByDay[day] = (scansByDay[day] || 0) + 1;
    });

    return Object.entries(scansByDay)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  // Helper method to aggregate top locations
  aggregateTopLocations(scans) {
    const locationCounts = {};

    scans.forEach(scan => {
      if (scan.location_data?.country) {
        const country = scan.location_data.country;
        locationCounts[country] = (locationCounts[country] || 0) + 1;
      }
    });

    return Object.entries(locationCounts)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }


  // Check user's QR code quota
  async checkQRQuota(userId) {
    try {
      // Get user's subscription plan
      const userSubscription = await this.getUserSubscription(userId);

      if (!userSubscription) {
        throw new Error('NO_ACTIVE_SUBSCRIPTION');
      }

      const currentCount = await QRCodeModel.count({
        where: { user_id: userId, is_active: true }
      });

      return {
        used: currentCount,
        limit: userSubscription.qr_code_limit,
        remaining: userSubscription.qr_code_limit - currentCount,
        canCreateMore: currentCount < userSubscription.qr_code_limit
      };

    } catch (error) {
      logger.error('Quota check failed:', error);
      throw error;
    }
  }

  // Helper to get user subscription (would typically call user service)
  async getUserSubscription(userId) {
    // This would typically make a call to the user service
    // For now, returning mock data - implement actual service call
    return {
      qr_code_limit: 20,
      plan_name: 'Professional'
    };
  }


  // Delete QR code with cleanup
  async deleteQRCode(qrId, userId) {
    try {
      const qrCode = await QRCodeModel.findOne({
        where: { id: qrId, user_id: userId }
      });

      if (!qrCode) {
        throw new Error('QR_NOT_FOUND');
      }

      // Delete associated files
      if (qrCode.qr_image_url) {
        await FileService.deleteFile(qrCode.qr_image_url);
      }

      // Soft delete by setting inactive
      qrCode.is_active = false;
      await qrCode.save();

      logger.info(`QR code deleted: ${qrId}`);
      return true;

    } catch (error) {
      logger.error('QR code deletion failed:', error);
      throw error;
    }
  }

}

module.exports = new QrService();
