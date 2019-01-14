@discovering-content
Feature: Another Bloody Feature
  In order to do maths
  As a developer
  I want to increment variables

  @automated
  Scenario: easy maths
    Given a variable set to 1
    When I increment the variable by 1
    Then the variable should contain 2

  @manual
  Scenario: hard maths
    Given a variable set to 1
    When I increment the variable by 1
    Then the variable should contain 2

  @automated
  Scenario: harder maths
    Given a variable set to 1
    When I increment the variable by 1
    Then the variable should contain 2