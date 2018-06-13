export const profileMetadata = {
  isReadOnly: false,
  commitMode: 'Immediate',
  validationMode: 'Immediate',
  propertyAnnotations: [
    {
      name: 'firstName',
      displayName: 'First Name',
      index: 0,
      validators: [
        {
          name: 'NonEmpty',
          params: { errorMessage: 'This value is required' }
        }
      ]
    },
    {
      name: 'lastName',
      displayName: 'Last Name',
      index: 1,
      validators: [
        {
          name: 'NonEmpty',
          params: { errorMessage: 'This value is required' }
        }
      ]
    },
    {
      name: 'email',
      displayName: 'Email',
      index: 2,
      editor: 'Email',
      validators: [
        {
          name: 'NonEmpty',
          params: { errorMessage: 'This value is required' }
        },
        { name: 'Email', params: { errorMessage: 'Not a valid email' } }
      ]
    }
  ]
};
