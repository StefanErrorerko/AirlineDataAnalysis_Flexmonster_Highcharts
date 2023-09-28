export async function fetchWithHeaders(url, options = {}) {
    const { headers = {}, ...restOptions } = options;
    const authToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwcm9kLXVzZXItY2xpZW50OnN0ZWZhbm11enlrYSIsImlzcyI6ImFnZW50OnN0ZWZhbm11enlrYTo6MGE4MTNiM2EtZmYzNC00ZDEyLTlmODUtYWNhNzA0NzBhZjdjIiwiaWF0IjoxNjk1MjMxMDM2LCJyb2xlIjpbInVzZXJfYXBpX2FkbWluIiwidXNlcl9hcGlfZW50ZXJwcmlzZV9hZG1pbiIsInVzZXJfYXBpX3JlYWQiLCJ1c2VyX2FwaV93cml0ZSJdLCJnZW5lcmFsLXB1cnBvc2UiOnRydWUsInNhbWwiOnt9fQ.pJKrasmULNxtmJJnQGvlZc4iaM5UNZS_RmVjXlYdua8NzIHSKOlk9vCo-skKUESV5WUR179e64U5LlsiWiRbIw'; // Replace with your actual authorization token
  
    headers['Authorization'] = `Bearer ${authToken}`;
  
    return fetch(url, {
      headers,
      ...restOptions,
    });
  }