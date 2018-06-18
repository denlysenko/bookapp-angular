export const passwordMetadata = {
  isReadOnly: false,
  commitMode: 'Immediate',
  validationMode: 'Immediate',
  propertyAnnotations: [
    {
      name: 'oldPassword',
      displayName: 'Current Password',
      index: 0,
      editor: 'Password',
      validators: [
        {
          name: 'NonEmpty',
          params: { errorMessage: 'This value is required' }
        }
      ]
    },
    {
      name: 'newPassword',
      displayName: 'New Password',
      index: 1,
      editor: 'Password',
      validators: [
        {
          name: 'NonEmpty',
          params: { errorMessage: 'This value is required' }
        }
      ]
    }
  ]
};
