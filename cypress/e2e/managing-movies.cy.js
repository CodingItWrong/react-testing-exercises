describe('managing movies', () => {
  const newMovieTitle = 'Movie 3';

  it('allows viewing and creating movies', () => {
    cy.intercept('GET', 'https://api.outsidein.dev/*/movies', [
      {id: 1, title: 'Movie 1'},
      {id: 2, title: 'Movie 2'},
    ]);
    cy.intercept('POST', 'https://api.outsidein.dev/*/movies', {
      id: 3,
      title: newMovieTitle,
    }).as('createMovie');

    cy.visit('/');

    cy.get('[data-cy="movies"]').contains('Movie 1');
    cy.get('[data-cy="movies"]').contains('Movie 2');

    cy.get('[data-cy="new-movie-title-field"]').type(newMovieTitle);
    cy.get('[data-cy="save-movie-button"]').click();

    cy.wait('@createMovie')
      .its('request.body')
      .should('deep.equal', {title: newMovieTitle});
    cy.get('[data-cy="movies"]').contains(newMovieTitle);
  });
});
