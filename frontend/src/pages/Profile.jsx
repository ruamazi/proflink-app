import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import { userAPI } from "../api";
import { isValidImageUrl, validateImageUrl } from "../utils/imageValidation";
import {
 User,
 Link2,
 Instagram,
 Twitter,
 Youtube,
 Github,
 Linkedin,
 Globe,
 Save,
 Check,
 Copy,
 Image,
 Loader2,
 AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";

const socialPlatforms = [
 { key: "instagram", label: "Instagram", icon: Instagram },
 { key: "twitter", label: "Twitter", icon: Twitter },
 { key: "youtube", label: "YouTube", icon: Youtube },
 { key: "github", label: "GitHub", icon: Github },
 { key: "linkedin", label: "LinkedIn", icon: Linkedin },
 { key: "website", label: "Website", icon: Globe },
];

const Profile = () => {
 const { t } = useTranslation();
 const { user, updateUser } = useAuth();
 const [loading, setLoading] = useState(false);
 const [copied, setCopied] = useState(false);
 const [avatarValidation, setAvatarValidation] = useState({
  isValidating: false,
  isValid: true,
  error: null,
  preview: null,
 });
 const [formData, setFormData] = useState({
  displayName: "",
  bio: "",
  avatar: "",
  theme: {
   backgroundColor: "#ffffff",
   buttonColor: "#000000",
   buttonTextColor: "#ffffff",
  },
  socialLinks: {
   instagram: "",
   twitter: "",
   youtube: "",
   github: "",
   linkedin: "",
   website: "",
  },
 });

 useEffect(() => {
  if (user) {
   setFormData({
    displayName: user.displayName || "",
    bio: user.bio || "",
    avatar: user.avatar || "",
    theme: user.theme || {
     backgroundColor: "#ffffff",
     buttonColor: "#000000",
     buttonTextColor: "#ffffff",
    },
    socialLinks: user.socialLinks || {
     instagram: "",
     twitter: "",
     youtube: "",
     github: "",
     linkedin: "",
     website: "",
    },
   });
   // Set preview if avatar exists
   if (user.avatar) {
    setAvatarValidation((prev) => ({
     ...prev,
     preview: user.avatar,
     isValid: true,
     error: null,
    }));
   }
  }
 }, [user]);

 const handleAvatarChange = async (e) => {
  const url = e.target.value;
  setFormData({ ...formData, avatar: url });

  if (!url) {
   setAvatarValidation({
    isValidating: false,
    isValid: true,
    error: null,
    preview: null,
   });
   return;
  }

  // Check if URL format is valid
  if (!isValidImageUrl(url)) {
   setAvatarValidation({
    isValidating: false,
    isValid: false,
    error: t("profile.avatar.invalidUrl"),
    preview: null,
   });
   return;
  }

  // Start validating
  setAvatarValidation({
   isValidating: true,
   isValid: false,
   error: null,
   preview: null,
  });

  // Check image size and validity
  const result = await validateImageUrl(url, 5);

  if (result.valid) {
   setAvatarValidation({
    isValidating: false,
    isValid: true,
    error: null,
    preview: url,
   });
  } else {
   setAvatarValidation({
    isValidating: false,
    isValid: false,
    error: result.error,
    preview: null,
   });
  }
 };

 const handleSubmit = async (e) => {
  e.preventDefault();

  // Don't submit if avatar is being validated
  if (avatarValidation.isValidating) {
   toast.error(t("profile.avatar.validating"));
   return;
  }

  // Don't submit if avatar is invalid
  if (formData.avatar && !avatarValidation.isValid) {
   toast.error(t("profile.avatar.fixError"));
   return;
  }

  setLoading(true);
  try {
   const response = await userAPI.updateProfile(formData);
   updateUser(response.data.user);
   toast.success(t("success.profileUpdated"));
  } catch (error) {
   toast.error(t("errors.profileUpdateFailed"));
  } finally {
   setLoading(false);
  }
 };

 const handleCopyLink = () => {
  const profileUrl = `${window.location.origin}/u/${user.username}`;
  navigator.clipboard.writeText(profileUrl);
  setCopied(true);
  toast.success(t("success.linkCopied"));
  setTimeout(() => setCopied(false), 2000);
 };

 if (!user) return null;

 const profileUrl = `${window.location.origin}/u/${user.username}`;

 return (
  <div className="space-y-6 animate-in">
   {/* Profile URL Card */}
   <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-sm p-6 text-white">
    <div className="flex items-center justify-between">
     <div>
      <h2 className="text-lg font-semibold">
       {t("profile.publicProfile.title")}
      </h2>
      <p className="text-indigo-100 text-sm mt-1">
       {t("profile.publicProfile.description")}
      </p>
      <div className="flex items-center space-x-2 mt-3">
       <Link2 className="h-4 w-4 text-indigo-200" />
       <span className="font-mono text-sm">{profileUrl}</span>
      </div>
     </div>
     <button
      onClick={handleCopyLink}
      className="flex items-center space-x-2 px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
     >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      <span>
       {copied ? t("common.copied") : t("profile.publicProfile.copyLink")}
      </span>
     </button>
    </div>
   </div>

   <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    {/* Profile Information */}
    <div className="lg:col-span-2 space-y-6">
     <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
       <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {t("profile.information.title")}
       </h3>
       <p className="text-sm text-gray-600 dark:text-gray-400">
        {t("profile.information.subtitle")}
       </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
       {/* Avatar Section */}
       <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
         {t("profile.avatar.title")}
        </label>
        <div className="flex items-start space-x-4">
         {/* Avatar Preview */}
         <div className="flex-shrink-0">
          <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center overflow-hidden">
           {avatarValidation.preview ? (
            <img
             src={avatarValidation.preview}
             alt="Avatar preview"
             className="w-full h-full object-cover"
             onError={() => {
              setAvatarValidation({
               isValidating: false,
               isValid: false,
               error: t("profile.avatar.loadError"),
               preview: null,
              });
             }}
            />
           ) : (
            <User className="h-10 w-10 text-gray-400 dark:text-gray-500" />
           )}
          </div>
         </div>

         {/* Avatar Input */}
         <div className="flex-1 space-y-2">
          <div className="relative">
           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Image className="h-5 w-5 text-gray-400" />
           </div>
           <input
            type="text"
            value={formData.avatar}
            onChange={handleAvatarChange}
            className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors ${
             avatarValidation.error
              ? "border-red-500 dark:border-red-500"
              : avatarValidation.preview && avatarValidation.isValid
                ? "border-green-500 dark:border-green-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
            placeholder={t("profile.avatar.placeholder")}
           />
           <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {avatarValidation.isValidating ? (
             <Loader2 className="h-5 w-5 text-indigo-600 animate-spin" />
            ) : avatarValidation.error ? (
             <AlertCircle className="h-5 w-5 text-red-500" />
            ) : avatarValidation.preview && avatarValidation.isValid ? (
             <Check className="h-5 w-5 text-green-500" />
            ) : null}
           </div>
          </div>

          {/* Validation Messages */}
          {avatarValidation.error && (
           <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" />
            {avatarValidation.error}
           </p>
          )}

          <p className="text-xs text-gray-500 dark:text-gray-400">
           {t("profile.avatar.hint")}
          </p>
         </div>
        </div>
       </div>

       <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
         {t("profile.information.displayName")}
        </label>
        <input
         type="text"
         value={formData.displayName}
         onChange={(e) =>
          setFormData({ ...formData, displayName: e.target.value })
         }
         className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
         placeholder="John Doe"
        />
       </div>

       <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
         {t("profile.information.username")}
        </label>
        <div className="flex items-center space-x-2">
         <span className="text-gray-500 dark:text-gray-400">/u/</span>
         <input
          type="text"
          value={user.username}
          disabled
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
         />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
         {t("profile.information.usernameHint")}
        </p>
       </div>

       <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
         {t("profile.information.bio")}
        </label>
        <textarea
         value={formData.bio}
         onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
         rows={4}
         className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
         placeholder={t("profile.information.bioPlaceholder")}
         maxLength={500}
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
         {t("profile.information.bioHint", {
          count: formData.bio?.length || 0,
         })}
        </p>
       </div>

       <button
        type="submit"
        disabled={
         loading ||
         avatarValidation.isValidating ||
         (formData.avatar && !avatarValidation.isValid)
        }
        className="inline-flex items-center space-x-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
       >
        <Save className="h-4 w-4" />
        <span>
         {loading ? t("common.loading") : t("profile.information.saveChanges")}
        </span>
       </button>
      </form>
     </div>

     {/* Social Links */}
     <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
       <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {t("profile.social.title")}
       </h3>
       <p className="text-sm text-gray-600 dark:text-gray-400">
        {t("profile.social.subtitle")}
       </p>
      </div>

      <div className="p-6 space-y-4">
       {socialPlatforms.map((platform) => {
        const Icon = platform.icon;
        return (
         <div key={platform.key} className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg">
           <Icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </div>
          <input
           type="text"
           value={formData.socialLinks[platform.key]}
           onChange={(e) =>
            setFormData({
             ...formData,
             socialLinks: {
              ...formData.socialLinks,
              [platform.key]: e.target.value,
             },
            })
           }
           className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
           placeholder={`${platform.label} URL`}
          />
         </div>
        );
       })}

       <button
        onClick={handleSubmit}
        disabled={
         loading ||
         avatarValidation.isValidating ||
         (formData.avatar && !avatarValidation.isValid)
        }
        className="inline-flex items-center space-x-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
       >
        <Save className="h-4 w-4" />
        <span>
         {loading ? t("common.loading") : t("profile.social.saveButton")}
        </span>
       </button>
      </div>
     </div>
    </div>

    {/* Theme Customization */}
    <div className="lg:col-span-1">
     <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 sticky top-24">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
       <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {t("profile.theme.title")}
       </h3>
       <p className="text-sm text-gray-600 dark:text-gray-400">
        {t("profile.theme.subtitle")}
       </p>
      </div>

      <div className="p-6 space-y-6">
       <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
         {t("profile.theme.backgroundColor")}
        </label>
        <div className="flex items-center space-x-3">
         <input
          type="color"
          value={formData.theme.backgroundColor}
          onChange={(e) =>
           setFormData({
            ...formData,
            theme: { ...formData.theme, backgroundColor: e.target.value },
           })
          }
          className="h-10 w-20 rounded cursor-pointer"
         />
         <input
          type="text"
          value={formData.theme.backgroundColor}
          onChange={(e) =>
           setFormData({
            ...formData,
            theme: { ...formData.theme, backgroundColor: e.target.value },
           })
          }
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
         />
        </div>
       </div>

       <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
         {t("profile.theme.buttonColor")}
        </label>
        <div className="flex items-center space-x-3">
         <input
          type="color"
          value={formData.theme.buttonColor}
          onChange={(e) =>
           setFormData({
            ...formData,
            theme: { ...formData.theme, buttonColor: e.target.value },
           })
          }
          className="h-10 w-20 rounded cursor-pointer"
         />
         <input
          type="text"
          value={formData.theme.buttonColor}
          onChange={(e) =>
           setFormData({
            ...formData,
            theme: { ...formData.theme, buttonColor: e.target.value },
           })
          }
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
         />
        </div>
       </div>

       <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
         {t("profile.theme.buttonTextColor")}
        </label>
        <div className="flex items-center space-x-3">
         <input
          type="color"
          value={formData.theme.buttonTextColor}
          onChange={(e) =>
           setFormData({
            ...formData,
            theme: { ...formData.theme, buttonTextColor: e.target.value },
           })
          }
          className="h-10 w-20 rounded cursor-pointer"
         />
         <input
          type="text"
          value={formData.theme.buttonTextColor}
          onChange={(e) =>
           setFormData({
            ...formData,
            theme: { ...formData.theme, buttonTextColor: e.target.value },
           })
          }
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
         />
        </div>
       </div>

       {/* Preview */}
       <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
         {t("profile.theme.preview")}
        </label>
        <div
         className="p-4 rounded-xl"
         style={{ backgroundColor: formData.theme.backgroundColor }}
        >
         <div className="text-center mb-4">
          <div className="w-16 h-16 mx-auto bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center mb-2 overflow-hidden">
           {avatarValidation.preview ? (
            <img
             src={avatarValidation.preview}
             alt="Avatar"
             className="w-full h-full object-cover"
            />
           ) : (
            <User className="h-8 w-8 text-gray-400 dark:text-gray-500" />
           )}
          </div>
          <p className="font-semibold text-gray-900 dark:text-white">
           {formData.displayName || t("profile.theme.sampleButton")}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
           @{user.username}
          </p>
         </div>
         <button
          className="w-full py-3 rounded-lg font-medium text-center"
          style={{
           backgroundColor: formData.theme.buttonColor,
           color: formData.theme.buttonTextColor,
          }}
         >
          {t("profile.theme.sampleButton")}
         </button>
        </div>
       </div>

       <button
        onClick={handleSubmit}
        disabled={
         loading ||
         avatarValidation.isValidating ||
         (formData.avatar && !avatarValidation.isValid)
        }
        className="w-full inline-flex items-center justify-center space-x-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
       >
        <Save className="h-4 w-4" />
        <span>
         {loading ? t("common.loading") : t("profile.theme.saveButton")}
        </span>
       </button>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default Profile;
