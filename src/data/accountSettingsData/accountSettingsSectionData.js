export const accountSettingsSectionData = [
    {
        tabName: 'personalInfo',
        pathName: 'personal-info',
        title: 'Personal Information',
        items: [
            {
                title: 'Full Name',
                contentDefault: 'Not provided',
                descInfo: 'Must match government ID.',
                inputLabels: ['First Name', 'Last Name'],
                type: 'text',
                metaKey: 'fullName'
            },
            {
                title: 'Preferred first name',
                contentDefault: 'Not provided',
                descInfo: 'Shown to other users.',
                inputLabels: ['Preferred first name'],
                type: 'text',
                metaKey: 'preferredFirstName'
            },
            {
                title: 'Phone number',
                contentDefault: 'Not provided',
                descInfo: 'Used for account contact.',
                inputLabels: ['Phone number'],
                type: 'text',
                metaKey: 'phoneNumber'
            },
            {
                title: 'Date of birth',
                contentDefault: 'Not provided',
                descInfo: 'Used for verification and safety.',
                inputLabels: ['Date of birth'],
                type: 'text',
                metaKey: 'dateOfBirth'
            },
            {
                title: 'Gender',
                contentDefault: 'Not provided',
                descInfo: 'Optional profile information.',
                inputLabels: ['Gender'],
                type: 'select',
                metaKey: 'gender'
            }
        ]
    },

    {
        tabName: 'loginAndSecurity',
        pathName: 'login-and-security',
        title: 'Login & Security',
        items: [
            {
                title: 'Two-factor authentication',
                contentDefault: 'Disabled',
                descInfo: 'Adds extra security to login.',
                inputLabels: ['Enable 2FA'],
                type: 'toggle',
                metaKey: 'twoFactorEnabled'
            },
            {
                title: 'Authentication method',
                contentDefault: 'Not set',
                descInfo: 'Choose verification method.',
                inputLabels: ['2FA method'],
                type: 'select',
                metaKey: 'twoFactorMethod'
            },
            {
                title: 'Login alerts',
                contentDefault: 'Enabled',
                descInfo: 'Notify on account login.',
                inputLabels: ['Login alerts'],
                type: 'toggle',
                metaKey: 'loginAlerts'
            },
            {
                title: 'Alert email',
                contentDefault: 'Not provided',
                descInfo: 'Email for security notifications.',
                inputLabels: ['Alert email'],
                type: 'text',
                metaKey: 'loginAlertsEmail'
            },
            {
                title: 'Session timeout',
                contentDefault: '7 days',
                descInfo: 'Auto logout after inactivity.',
                inputLabels: ['Session timeout'],
                type: 'select',
                metaKey: 'sessionTimeout'
            },
            {
                title: 'Device tracking',
                contentDefault: 'Enabled',
                descInfo: 'Monitor active devices.',
                inputLabels: ['Device tracking'],
                type: 'toggle',
                metaKey: 'deviceTracking'
            },
            {
                title: 'Last password change',
                contentDefault: 'Never',
                descInfo: 'Last password update time.',
                inputLabels: [],
                type: 'readonly',
                metaKey: 'lastPasswordChangedAt'
            },
            {
                title: 'Last 2FA activation',
                contentDefault: 'Never',
                descInfo: 'Last 2FA enable time.',
                inputLabels: [],
                type: 'readonly',
                metaKey: 'last2FAEnabledAt'
            }
        ]
    },

    {
        tabName: 'privacy',
        pathName: 'privacy-and-sharing',
        title: 'Privacy',
        items: [
            {
                title: 'Profile visibility',
                contentDefault: 'Public',
                descInfo: 'Who can view your profile.',
                inputLabels: ['Profile visibility'],
                type: 'select',
                metaKey: 'profileVisibility'
            },
            {
                title: 'Show email',
                contentDefault: 'Hidden',
                descInfo: 'Display email to others.',
                inputLabels: ['Show email'],
                type: 'toggle',
                metaKey: 'showEmail'
            },
            {
                title: 'Show phone',
                contentDefault: 'Hidden',
                descInfo: 'Display phone number.',
                inputLabels: ['Show phone'],
                type: 'toggle',
                metaKey: 'showPhone'
            },
            {
                title: 'Online status',
                contentDefault: 'Visible',
                descInfo: 'Show when you are online.',
                inputLabels: ['Online status'],
                type: 'toggle',
                metaKey: 'showOnlineStatus'
            },
            {
                title: 'Messaging',
                contentDefault: 'Enabled',
                descInfo: 'Allow messages.',
                inputLabels: ['Messaging'],
                type: 'toggle',
                metaKey: 'allowMessaging'
            },
            {
                title: 'Search engine indexing',
                contentDefault: 'Enabled',
                descInfo: 'Allow external indexing.',
                inputLabels: ['Indexing'],
                type: 'toggle',
                metaKey: 'searchEngineIndexing'
            },
            {
                title: 'Show in search results',
                contentDefault: 'Enabled',
                descInfo: 'Appear in internal search.',
                inputLabels: ['Search visibility'],
                type: 'toggle',
                metaKey: 'showInSearchResults'
            },
            {
                title: 'Data download',
                contentDefault: 'Not requested',
                descInfo: 'Download your data.',
                inputLabels: [],
                type: 'readonly',
                metaKey: 'dataDownloadRequestedAt'
            },
            {
                title: 'Account deletion request',
                contentDefault: 'Not requested',
                descInfo: 'Request account deletion.',
                inputLabels: [],
                type: 'readonly',
                metaKey: 'deleteAccountRequestedAt'
            },
            {
                title: 'Scheduled deletion',
                contentDefault: 'Not scheduled',
                descInfo: 'Scheduled account removal.',
                inputLabels: [],
                type: 'readonly',
                metaKey: 'deleteAccountScheduledAt'
            }
        ]
    },

    {
        tabName: 'notifications',
        pathName: 'notifications',
        title: 'Notifications',
        items: [
            {
                title: 'Email notifications',
                contentDefault: 'Enabled',
                descInfo: 'Receive emails.',
                inputLabels: ['Email notifications'],
                type: 'toggle',
                metaKey: 'emailNotifications'
            },
            {
                title: 'SMS notifications',
                contentDefault: 'Disabled',
                descInfo: 'Receive SMS alerts.',
                inputLabels: ['SMS notifications'],
                type: 'toggle',
                metaKey: 'smsNotifications'
            },
            {
                title: 'Push notifications',
                contentDefault: 'Enabled',
                descInfo: 'Mobile push alerts.',
                inputLabels: ['Push notifications'],
                type: 'toggle',
                metaKey: 'pushNotifications'
            },
            {
                title: 'Booking alerts',
                contentDefault: 'Enabled',
                descInfo: 'Booking updates.',
                inputLabels: ['Booking alerts'],
                type: 'toggle',
                metaKey: 'bookingAlerts'
            },
            {
                title: 'Message alerts',
                contentDefault: 'Enabled',
                descInfo: 'New messages.',
                inputLabels: ['Message alerts'],
                type: 'toggle',
                metaKey: 'messageAlerts'
            },
            {
                title: 'Review alerts',
                contentDefault: 'Enabled',
                descInfo: 'New reviews.',
                inputLabels: ['Review alerts'],
                type: 'toggle',
                metaKey: 'reviewAlerts'
            },
            {
                title: 'Price drop alerts',
                contentDefault: 'Enabled',
                descInfo: 'Price changes.',
                inputLabels: ['Price alerts'],
                type: 'toggle',
                metaKey: 'priceDropAlerts'
            },
            {
                title: 'New listings',
                contentDefault: 'Disabled',
                descInfo: 'New content alerts.',
                inputLabels: ['New listings'],
                type: 'toggle',
                metaKey: 'newListingAlerts'
            },
            {
                title: 'Marketing emails',
                contentDefault: 'Disabled',
                descInfo: 'Promotions.',
                inputLabels: ['Marketing emails'],
                type: 'toggle',
                metaKey: 'marketingEmails'
            },
            {
                title: 'Weekly digest',
                contentDefault: 'Disabled',
                descInfo: 'Weekly summary.',
                inputLabels: ['Weekly digest'],
                type: 'toggle',
                metaKey: 'weeklyDigest'
            },
            {
                title: 'Product updates',
                contentDefault: 'Enabled',
                descInfo: 'Feature updates.',
                inputLabels: ['Product updates'],
                type: 'toggle',
                metaKey: 'productUpdates'
            },
            {
                title: 'Security alerts',
                contentDefault: 'Enabled',
                descInfo: 'Security notifications.',
                inputLabels: ['Security alerts'],
                type: 'toggle',
                metaKey: 'securityAlerts'
            },
            {
                title: 'Login alerts',
                contentDefault: 'Enabled',
                descInfo: 'Login notifications.',
                inputLabels: ['Login alerts'],
                type: 'toggle',
                metaKey: 'loginAlertNotif'
            }
        ]
    },

    {
        tabName: 'payments',
        pathName: 'payments',
        title: 'Payments',
        items: []
    }
];