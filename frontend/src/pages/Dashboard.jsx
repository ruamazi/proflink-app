import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { linkAPI } from '../api';
import { 
  Plus, Link2, ExternalLink, Trash2, Edit2, GripVertical, 
  Copy, Eye, EyeOff, BarChart3, Check 
} from 'lucide-react';
import toast from 'react-hot-toast';

const iconOptions = [
  { value: 'link', label: 'Link' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'twitter', label: 'Twitter' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'github', label: 'GitHub' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'twitch', label: 'Twitch' },
  { value: 'discord', label: 'Discord' },
  { value: 'website', label: 'Website' },
  { value: 'mail', label: 'Email' },
];

const Dashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingLink, setEditingLink] = useState(null);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ title: '', url: '', icon: 'link' });

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const response = await linkAPI.getMyLinks();
      setLinks(response.data.links);
    } catch (error) {
      toast.error(t('errors.loadLinksFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingLink) {
        await linkAPI.updateLink(editingLink._id, formData);
        toast.success(t('success.linkUpdated'));
      } else {
        await linkAPI.createLink(formData);
        toast.success(t('success.linkCreated'));
      }
      setShowAddModal(false);
      setEditingLink(null);
      setFormData({ title: '', url: '', icon: 'link' });
      fetchLinks();
    } catch (error) {
      toast.error(error.response?.data?.message || t('errors.linkUpdateFailed'));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t('common.confirmDelete'))) return;
    try {
      await linkAPI.deleteLink(id);
      toast.success(t('success.linkDeleted'));
      fetchLinks();
    } catch (error) {
      toast.error(t('errors.linkDeleteFailed'));
    }
  };

  const handleToggleActive = async (link) => {
    try {
      await linkAPI.updateLink(link._id, { isActive: !link.isActive });
      fetchLinks();
      toast.success(link.isActive ? t('success.linkHidden') : t('success.linkVisible'));
    } catch (error) {
      toast.error(t('errors.linkUpdateFailed'));
    }
  };

  const handleCopyLink = () => {
    const profileUrl = `${window.location.origin}/u/${user.username}`;
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    toast.success(t('success.linkCopied'));
    setTimeout(() => setCopied(false), 2000);
  };

  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);
  const activeLinks = links.filter(link => link.isActive).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t('dashboard.stats.totalLinks')}</p>
                <p className="text-2xl font-bold text-gray-900">{links.length}</p>
              </div>
              <div className="p-3 bg-indigo-50 rounded-lg">
                <Link2 className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t('dashboard.stats.activeLinks')}</p>
                <p className="text-2xl font-bold text-gray-900">{activeLinks}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t('dashboard.stats.totalClicks')}</p>
                <p className="text-2xl font-bold text-gray-900">{totalClicks}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-sm p-6 text-white">
            <p className="text-sm font-medium text-indigo-100">{t('dashboard.stats.yourProfile')}</p>
            <p className="text-lg font-semibold truncate">/{user.username}</p>
            <button
              onClick={handleCopyLink}
              className="mt-3 flex items-center space-x-1 text-sm text-white hover:text-indigo-100 transition-colors"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? t('common.copied') : t('dashboard.stats.copyLink')}</span>
            </button>
          </div>
      </div>

      {/* Links Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{t('dashboard.links.title')}</h2>
            <p className="text-sm text-gray-600">{t('dashboard.links.subtitle')}</p>
          </div>
          <button
            onClick={() => {
              setEditingLink(null);
              setFormData({ title: '', url: '', icon: 'link' });
              setShowAddModal(true);
            }}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>{t('dashboard.links.addLink')}</span>
          </button>
        </div>

        <div className="divide-y divide-gray-100">
          {links.length === 0 ? (
            <div className="p-12 text-center">
              <div className="inline-flex items-center justify-center p-4 bg-gray-100 rounded-full mb-4">
                <Link2 className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('dashboard.links.noLinks')}</h3>
              <p className="text-gray-600 mb-4">{t('dashboard.links.noLinksDescription')}</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>{t('dashboard.links.addFirstLink')}</span>
              </button>
            </div>
          ) : (
            links.map((link, index) => (
              <div
                key={link._id}
                className={`p-4 flex items-center space-x-4 hover:bg-gray-50 transition-colors ${!link.isActive ? 'opacity-60' : ''}`}
              >
                <div className="flex items-center justify-center w-8 text-gray-400">
                  <GripVertical className="h-5 w-5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{link.title}</h3>
                    <span className="text-xs text-gray-500 capitalize">{link.icon}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{link.url}</p>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">{link.clicks}</span> {t('dashboard.links.clicks')}
                  </div>
                  
                  <button
                    onClick={() => handleToggleActive(link)}
                    className={`p-2 rounded-lg transition-colors ${link.isActive ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`}
                    title={link.isActive ? t('dashboard.links.hide') : t('dashboard.links.show')}
                  >
                    {link.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                  
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  
                  <button
                    onClick={() => {
                      setEditingLink(link);
                      setFormData({ title: link.title, url: link.url, icon: link.icon });
                      setShowAddModal(true);
                    }}
                    className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    title={t('dashboard.links.edit')}
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => handleDelete(link._id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title={t('dashboard.links.delete')}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-in">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {editingLink ? t('dashboard.modal.editTitle') : t('dashboard.modal.addTitle')}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('dashboard.modal.titleLabel')}</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder={t('dashboard.modal.titlePlaceholder')}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('dashboard.modal.urlLabel')}</label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder={t('dashboard.modal.urlPlaceholder')}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('dashboard.modal.iconLabel')}</label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {iconOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {t('dashboard.modal.cancel')}
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  {editingLink ? t('dashboard.modal.updateButton') : t('dashboard.modal.addButton')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;