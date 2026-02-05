const Link = require('../models/Link');
const Analytics = require('../models/Analytics');

const getMyLinks = async (req, res) => {
  try {
    const links = await Link.find({ user: req.user.id }).sort({ order: 1 });
    res.json({ links });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createLink = async (req, res) => {
  try {
    const { title, url, icon, startDate, endDate } = req.body;
    
    const linkCount = await Link.countDocuments({ user: req.user.id });
    
    const link = await Link.create({
      user: req.user.id,
      title,
      url,
      icon: icon || 'link',
      order: linkCount,
      startDate: startDate || null,
      endDate: endDate || null
    });

    res.status(201).json({
      message: 'Link created successfully',
      link
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateLink = async (req, res) => {
  try {
    const { title, url, icon, isActive, isPinned, startDate, endDate } = req.body;
    
    const link = await Link.findOne({ _id: req.params.id, user: req.user.id });
    
    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }

    link.title = title || link.title;
    link.url = url || link.url;
    link.icon = icon || link.icon;
    if (typeof isActive !== 'undefined') link.isActive = isActive;
    if (typeof isPinned !== 'undefined') link.isPinned = isPinned;
    if (typeof startDate !== 'undefined') link.startDate = startDate || null;
    if (typeof endDate !== 'undefined') link.endDate = endDate || null;
    
    await link.save();

    res.json({
      message: 'Link updated successfully',
      link
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteLink = async (req, res) => {
  try {
    const link = await Link.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    
    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }

    res.json({ message: 'Link deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const reorderLinks = async (req, res) => {
  try {
    const { linkIds } = req.body;
    
    const updatePromises = linkIds.map((id, index) => 
      Link.findOneAndUpdate(
        { _id: id, user: req.user.id },
        { order: index }
      )
    );
    
    await Promise.all(updatePromises);

    res.json({ message: 'Links reordered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const trackClick = async (req, res) => {
  try {
    const { linkId } = req.params;
    
    const link = await Link.findById(linkId);
    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }

    link.clicks += 1;
    await link.save();

    await Analytics.create({
      user: link.user,
      link: linkId,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
      referrer: req.headers.referer
    });

    res.json({ message: 'Click tracked' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getMyLinks,
  createLink,
  updateLink,
  deleteLink,
  reorderLinks,
  trackClick
};