# Project TODO

- [x] Inspect the existing combo-pizza scroll menu and identify its item data/rendering flow
- [x] Add a search bar above the combo-pizza scroll menu
- [x] Filter combo-pizza items by the entered search text
- [x] Add an accessible empty-search-results state and clear behavior
- [x] Add or update Vitest coverage for the filtering behavior
- [x] Verify the UI on desktop and mobile viewports
- [ ] Save a checkpoint with the completed feature
- [x] Clarify that search covers the full menu and keep category tabs from appearing active while search results are shown
- [x] Add test coverage for full-menu search scope and clearing search when a category tab is selected
- [x] Record viewport verification findings: desktop shows the search field above category pills and cards; mobile keeps the field full-width above the horizontally scrollable cards
- [x] Add behavior-level coverage for full-menu search results and category selection restoring category-scoped results
- [x] Add an executable state-transition test for search active → category selected → search cleared → category results restored
