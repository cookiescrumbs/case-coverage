@creating-and-adapting-content
Feature: Awsome Feature
  In order to do maths
  As a developer
  I want to increment variables

  Scenario: easy maths
    Given a variable set to 1
    When I increment the variable by 1
    Then the variable should contain 2
  @manual
  Scenario: some maths
      Given a variable set to 1
      When I increment the variable by 1
      Then the variable should contain 2