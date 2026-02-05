import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { linkAPI } from '../api';
import {
  Plus, Link2, ExternalLink, Trash2, Edit2, GripVertical,
  Copy, Eye, EyeOff, BarChart3, Check, Pin, PinOff, Calendar, Clock
} from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
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

// Helper function to check if link is within schedule
const isWithinSchedule = (link) => {
  const now = new Date();
  if (link.startDate && new Date(link.startDate) > now) return false;
  if (link.endDate && new Date(link.endDate) < now) return false;
  return true;
};

// Helper to format date for display
const formatScheduleDate = (dateString, t) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const Dashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingLink, setEditingLink] = useState(null);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ 
    title: '', 
    url: '', 
    icon: 'link',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const response = await linkAPI.getMyLinks();
      // Sort links by order field
      const sortedLinks = response.data.links.sort((a, b) => a.order - b.order);
      setLinks(sortedLinks);
    } catch (error) {
      toast.error(t('errors.loadLinksFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        startDate: formData.startDate || null,
        endDate: formData.endDate || null
      };

      if (editingLink) {
        await linkAPI.updateLink(editingLink._id, data);
        toast.success(t('success.linkUpdated'));
      } else {
        await linkAPI.createLink(data);
        toast.success(t('success.linkCreated'));
      }
      setShowAddModal(false);
      setEditingLink(null);
      setFormData({ title: '', url: '', icon: 'link', startDate: '', endDate: '' });
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

  const handleTogglePin = async (link) => {
    try {
      await linkAPI.updateLink(link._id, { isPinned: !link.isPinned });
      fetchLinks();
      toast.success(link.isPinned ? t('success.linkUnpinned') : t('success.linkPinned'));
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

  const openEditModal = (link) => {
    setEditingLink(link);
    setFormData({
      title: link.title,
      url: link.url,
      icon: link.icon,
      startDate: link.startDate ? new Date(link.startDate).toISOString().slice(0, 16) : '',
      endDate: link.endDate ? new Date(link.endDate).toISOString().slice(0, 16) : ''
    });
    setShowAddModal(true);
  };

  // Handle drag and drop
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceIndex === destinationIndex) return;

    // Reorder links locally
    const reorderedLinks = Array.from(links);
    const [removed] = reorderedLinks.splice(sourceIndex, 1);
    reorderedLinks.splice(destinationIndex, 0, removed);

    // Update order numbers
    const updatedLinks = reorderedLinks.map((link, index) => ({
      ...link,
      order: index
    }));

    setLinks(updatedLinks);

    // Send reorder request to backend
    try {
      const linkIds = updatedLinks.map(link => link._id);
      await linkAPI.reorderLinks(linkIds);
      toast.success(t('success.linksReordered'));
    } catch (error) {
      toast.error(t('errors.linksReorderFailed'));
      // Revert to original order on error
      fetchLinks();
    }
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
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('dashboard.stats.totalLinks')}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{links.length}</p>
              </div>
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900 rounded-lg">
                <Link2 className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('dashboard.stats.activeLinks')}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{activeLinks}</p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900 rounded-lg">
                <Eye className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('dashboard.stats.totalClicks')}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalClicks}</p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
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
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t('dashboard.links.title')}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('dashboard.links.subtitle')}</p>
          </div>
          <button
            onClick={() => {
              setEditingLink(null);
              setFormData({ title: '', url: '', icon: 'link', startDate: '', endDate: '' });
              setShowAddModal(true);
            }}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>{t('dashboard.links.addLink')}</span>
          </button>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="links">
            {(provided) => (
              <div 
                {...provided.droppableProps} 
                ref={provided.innerRef}
                className="divide-y divide-gray-100 dark:divide-gray-700"
              >
                {links.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="inline-flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
                      <Link2 className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{t('dashboard.links.noLinks')}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{t('dashboard.links.noLinksDescription')}</p>
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span>{t('dashboard.links.addFirstLink')}</span>
                    </button>
                  </div>
                ) : (
                  links.map((link, index) => {
                    const inSchedule = isWithinSchedule(link);
                    const scheduleStatus = !inSchedule ? t('dashboard.links.scheduledHidden') : null;
                    
                    return (
                      <Draggable key={link._id} draggableId={link._id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`p-4 flex items-center space-x-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all ${!link.isActive ? 'opacity-60' : ''} ${link.isPinned ? 'bg-indigo-50/50 dark:bg-indigo-900/20' : ''} ${snapshot.isDragging ? 'bg-indigo-50 dark:bg-indigo-900/30 shadow-lg ring-2 ring-indigo-500/50' : ''}`}
                          >
                            <div 
                              {...provided.dragHandleProps}
                              className="flex items-center justify-center w-8 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-grab active:cursor-grabbing"
                            >
                              <GripVertical className="h-5 w-5" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                                {link.isPinned && (
                                  <Pin className="h-4 w-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                                )}
                                <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">{link.title}</h3>
                                <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">{link.icon}</span>
                                {!link.isActive && (
                                  <span className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                                    {t('dashboard.links.hidden')}
                                  </span>
                                )}
                                {scheduleStatus && (
                                  <span className="text-xs px-2 py-0.5 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {scheduleStatus}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{link.url}</p>
                              {(link.startDate || link.endDate) && (
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {link.startDate && `${t('dashboard.links.from')} ${formatScheduleDate(link.startDate, t)}`}
                                  {link.startDate && link.endDate && ' - '}
                                  {link.endDate && `${t('dashboard.links.to')} ${formatScheduleDate(link.endDate, t)}`}
                                </p>
                              )}
                            </div>

                            <div className="flex items-center space-x-2">
                              <div className="text-sm text-gray-600 dark:text-gray-400 mr-2">
                                <span className="font-medium">{link.clicks}</span> {t('dashboard.links.clicks')}
                              </div>

                              <button
                                onClick={() => handleTogglePin(link)}
                                className={`p-2 rounded-lg transition-colors ${link.isPinned ? 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900 hover:bg-indigo-200 dark:hover:bg-indigo-800' : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                title={link.isPinned ? t('dashboard.links.unpin') : t('dashboard.links.pin')}
                              >
                                {link.isPinned ? <Pin className="h-4 w-4" /> : <PinOff className="h-4 w-4" />}
                              </button>

                              <button
                                onClick={() => handleToggleActive(link)}
                                className={`p-2 rounded-lg transition-colors ${link.isActive ? 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900' : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                title={link.isActive ? t('dashboard.links.hide') : t('dashboard.links.show')}
                              >
                                {link.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                              </button>

                              <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900 rounded-lg transition-colors"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </a>

                              <button
                                onClick={() => openEditModal(link)}
                                className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900 rounded-lg transition-colors"
                                title={t('dashboard.links.edit')}
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>

                              <button
                                onClick={() => handleDelete(link._id)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
                                title={t('dashboard.links.delete')}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full p-6 animate-in max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {editingLink ? t('dashboard.modal.editTitle') : t('dashboard.modal.addTitle')}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('dashboard.modal.titleLabel')}</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder={t('dashboard.modal.titlePlaceholder')}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('dashboard.modal.urlLabel')}</label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder={t('dashboard.modal.urlPlaceholder')}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('dashboard.modal.iconLabel')}</label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {iconOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              {/* Scheduling Section */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {t('dashboard.modal.scheduleTitle')}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  {t('dashboard.modal.scheduleDescription')}
                </p>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                      {t('dashboard.modal.startDate')}
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                      {t('dashboard.modal.endDate')}
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
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
