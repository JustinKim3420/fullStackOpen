describe('Blog app', function () {
  beforeEach(function () {
    cy.deleteDB()
    cy.createUser()
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('form').should('have.class', 'loginForm')
  })

  it('Shows success when correct login is provided', function () {
    cy.get('#usernameInput').type('testUsername')
    cy.get('#passwordInput').type('testPassword')
    cy.get('#loginButton').click()
    cy.get('.message').should('contain', 'Successfully logged in')
  })
  it('Shows error message when incorrect login is provided', function () {
    cy.get('#usernameInput').type('incorrectTestUsername')
    cy.get('#passwordInput').type('incorrectTestPassword')
    cy.get('#loginButton').click()
    cy.get('.message').should('contain', 'Incorrect username or password')
  })
})

describe('Blog app', function () {
  describe('When logged in', function () {
    beforeEach(function () {
      cy.deleteDB()
      cy.createUser()
      cy.login()
      cy.visit('http://localhost:3000')
    })

    it('A blog can be created', function () {
      const sampleBlogData = {
        title: 'blogTitle',
        author: 'blogAuthor',
        url: 'blogURL',
      }
      cy.contains('Show Blog Form').click()

      cy.get('#titleInput').type(sampleBlogData.title)
      cy.get('#authorInput').type(sampleBlogData.author)
      cy.get('#urlInput').type(sampleBlogData.url)
      cy.get('.submitButton').click()

      cy.get('html').should(
        'contain',
        `${sampleBlogData.title} ${sampleBlogData.author}`
      )
    })

    it('A blog can be liked', function () {
      const sampleBlogData = {
        title: 'blogTitle',
        author: 'blogAuthor',
        url: 'blogURL',
      }
      cy.contains('Show Blog Form').click()

      cy.get('#titleInput').type(sampleBlogData.title)
      cy.get('#authorInput').type(sampleBlogData.author)
      cy.get('#urlInput').type(sampleBlogData.url)
      cy.get('.submitButton').click()

      cy.contains('Show more info').click()
      cy.get('.likeButton').click()

      cy.get('#likes').should('contain', 1)
    })

    it('User that created the blog can also delete the blog', function () {
      const sampleBlogData = {
        title: 'blogTitle',
        author: 'blogAuthor',
        url: 'blogURL',
      }
      cy.contains('Show Blog Form').click()

      cy.get('#titleInput').type(sampleBlogData.title)
      cy.get('#authorInput').type(sampleBlogData.author)
      cy.get('#urlInput').type(sampleBlogData.url)
      cy.get('.submitButton').click()

      cy.contains('Show more info').click()
      cy.contains('Delete').click()
      cy.on('window:confirm', (str) => {
        expect(str).to.equal(
          `Do you want to delete ${sampleBlogData.title} by ${sampleBlogData.author}?`
        )
      })
      cy.on('window:confirm', () => true)

      cy.get(`${sampleBlogData.title} ${sampleBlogData.author}`).should(
        'not.exist'
      )
    })
    it.only('User that created the blog can also delete the blog', function () {
      const sampleBlogData = [
        {
          title: 'blogTitle1',
          author: 'blogAuthor1',
          url: 'blogURL1',
        },
        {
          title: 'blogTitle2',
          author: 'blogAuthor2',
          url: 'blogURL2',
        },
        {
          title: 'blogTitle3',
          author: 'blogAuthor3',
          url: 'blogURL3',
        },
      ]

      for (const data of sampleBlogData) {
        cy.contains('Show Blog Form').click()
        cy.get('#titleInput').type(data.title)
        cy.get('#authorInput').type(data.author)
        cy.get('#urlInput').type(data.url)
        cy.get('.submitButton').click()
        cy.contains('Show more info').click()
      }

      cy.contains('blogTitle1').contains('Likes').click()

      cy.contains('blogTitle2').contains('Likes').click()
      cy.clock()
      cy.tick(1000)
      cy.contains('blogTitle2').contains('Likes').click()

      cy.get('.blog').then(blogs => {
        cy.get(blogs[0]).should('contain','blogTitle2')
        cy.get(blogs[1]).should('contain','blogTitle1')
        cy.get(blogs[2]).should('contain','blogTitle3')
      })

    })
  })
})
