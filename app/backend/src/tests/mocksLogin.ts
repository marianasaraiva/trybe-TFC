class MocksLogin {
  public userModel: [{
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
    },{
      id: 2,
      username: 'Admin2',
      role: 'admin2',
      email: 'admin2@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
    },
  ]
  
  public login = {
    email: 'admin@admin.com',
    password: 'secret_admin',
  }

  public loginValidate = 'admin'
}

export default new MocksLogin();

