const User = require('../models/User');
const Link = require('../models/Link');

const getProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username.toLowerCase() });
    
    if (!user || !user.isActive) {
      return res.status(404).json({ message: 'User not found' });
    }

    const links = await Link.find({ user: user._id, isActive: true }).sort({ order: 1 });

    res.json({
      user: {
        username: user.username,
        displayName: user.displayName,
        bio: user.bio,
        avatar: user.avatar,
        theme: user.theme,
        socialLinks: user.socialLinks
      },
      links: links.map(link => ({
        id: link._id,
        title: link.title,
        url: link.url,
        icon: link.icon
      }))
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { displayName, bio, avatar, theme, socialLinks } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { 
        displayName, 
        bio, 
        avatar,
        theme,
        socialLinks
      },
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        displayName: user.displayName,
        bio: user.bio,
        avatar: user.avatar,
        theme: user.theme,
        socialLinks: user.socialLinks
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateUsername = async (req, res) => {
  try {
    const { username } = req.body;
    
    const existingUser = await User.findOne({ username: username.toLowerCase() });
    if (existingUser && existingUser._id.toString() !== req.user.id) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { username: username.toLowerCase() },
      { new: true }
    );

    res.json({
      message: 'Username updated successfully',
      username: user.username
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getProfile, updateProfile, updateUsername };