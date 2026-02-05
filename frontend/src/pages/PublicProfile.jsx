import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { userAPI, linkAPI } from '../api';
import { 
  User, Instagram, Twitter, Youtube, Github, Linkedin, Globe,
  ExternalLink, Link2, AlertCircle, Share2, Copy, Check
} from 'lucide-react';
import toast from 'react-hot-toast';

const iconMap = {
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
  github: Github,
  linkedin: Linkedin,
  website: Globe,
  link: Link2,
};

const PublicProfile = () => {
  const { t } = useTranslation();
  const { username } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, [username]);

  const fetchProfile = async () => {
    try {
      const response = await userAPI.getProfile(username);
      setProfile(response.data);
    } catch (error) {
      setError(t('publicProfile.notFound.title'));
    } finally {
      setLoading(false);
    }
  };

  const handleLinkClick = async (link) => {
    try {
      await linkAPI.trackClick(link.id);
    } catch (error) {
      console.error('Failed to track click');
    }
    window.open(link.url, '_blank');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success(t('success.linkCopied'));
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f9fafb' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('publicProfile.notFound.title')}</h1>
          <p className="text-gray-600 mb-6">{t('publicProfile.notFound.description')}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {t('publicProfile.notFound.goHome')}
          </button>
        </div>
      </div>
    );
  }

  const { user, links } = profile;
  const theme = user.theme || {};

  const getSocialIcon = (platform) => {
    const Icon = iconMap[platform.toLowerCase()];
    return Icon || Globe;
  };

  const hasSocialLinks = user.socialLinks && Object.values(user.socialLinks).some(link => link);

  return (
    <div 
      className="min-h-screen py-12 px-4"
      style={{ backgroundColor: theme.backgroundColor || '#ffffff' }}
    >
      <div className="max-w-lg mx-auto">
        {/* Share Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={handleShare}
            className="flex items-center space-x-2 px-4 py-2 bg-white bg-opacity-80 backdrop-blur rounded-full shadow-sm hover:shadow-md transition-all"
          >
            {copied ? <Check className="h-4 w-4 text-green-600" /> : <Share2 className="h-4 w-4" />}
            <span className="text-sm font-medium">{copied ? t('common.copied') : t('common.share')}</span>
          </button>
        </div>

        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4 shadow-lg">
            {user.avatar ? (
              <img src={user.avatar} alt={user.displayName} className="w-full h-full rounded-full object-cover" />
            ) : (
              <User className="h-12 w-12 text-gray-400" />
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{user.displayName}</h1>
          <p className="text-gray-600 mb-4">@{user.username}</p>
          {user.bio && (
            <p className="text-gray-700 max-w-md mx-auto">{user.bio}</p>
          )}
        </div>

        {/* Social Links */}
        {hasSocialLinks && (
          <div className="flex justify-center space-x-4 mb-8">
            {Object.entries(user.socialLinks).map(([platform, url]) => {
              if (!url) return null;
              const Icon = getSocialIcon(platform);
              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white rounded-full shadow-sm hover:shadow-md transition-all hover:scale-110"
                  title={platform}
                >
                  <Icon className="h-5 w-5 text-gray-700" />
                </a>
              );
            })}
          </div>
        )}

        {/* Links */}
        <div className="space-y-3">
          {links.length === 0 ? (
            <div className="text-center py-12">
              <Link2 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">{t('dashboard.links.noLinks')}</p>
            </div>
          ) : (
            links.map((link) => {
              const Icon = iconMap[link.icon] || Link2;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link)}
                  className="w-full group relative overflow-hidden rounded-xl transition-all hover:scale-[1.02] hover:shadow-lg"
                  style={{ 
                    backgroundColor: theme.buttonColor || '#000000',
                  }}
                >
                  <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <Icon 
                        className="h-5 w-5 transition-colors"
                        style={{ color: theme.buttonTextColor || '#ffffff' }}
                      />
                      <span 
                        className="font-medium"
                        style={{ color: theme.buttonTextColor || '#ffffff' }}
                      >
                        {link.title}
                      </span>
                    </div>
                    <ExternalLink 
                      className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all"
                      style={{ color: theme.buttonTextColor || '#ffffff' }}
                    />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <a 
            href="/" 
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Link2 className="h-4 w-4" />
            <span className="text-sm">{t('publicProfile.createYourOwn')}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;