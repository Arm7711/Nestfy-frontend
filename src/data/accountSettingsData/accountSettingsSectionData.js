export const accountSettingsSectionData = [
    {
        tabName: 'personalInfo',
        pathName: 'personal-info',
        title: 'Personal Inforamtion',
        items: [
            {
                title: 'Legal name',
                contentDefault: 'Not provided',
                descInfo: 'Make sure this matches the name on your government ID.',
                inputLabels: ['First Name', 'LastName']
            },
            {
                title: 'Preferred first name',
                contentDefault: 'Not provided',
                descInfo: 'This is how your first name will appear to hosts and guests.',
                inputLabels: ['Preferred first name (Optional)']
            },
            {
                title: 'Email address',
                contentDefault: 'Not provided',
                descInfo: 'Use an address you’ll always have access to..',
                inputLabels: ['Email Addres']
            },
        ]
    },
    
    {
        tabName: 'loginAndSecurity',
        pathName: 'login-and-security',
        title: 'Login & Security'
    },
    {
        tabName: 'privacy',
        pathName: 'privacy-and-sharing',
        title: 'Privacy'
    },
    {
        tabName: 'notifications',
        pathName: 'notifications',
        title: 'Notifications'
    },
    {
        tabName: 'payments',
        pathName: 'payments',
        title: 'Payments'
    }
]