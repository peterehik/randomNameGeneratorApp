def hasAllNumbers(sequence):
    if not sequence:
        return False
    result = [1] * 9
    for num in sequence:
        try:
            result[num-1] = result[num-1] - 1
        except IndexError:
            return False
    return result == [0] * 9


def valid_choice(number, alreadyChosen):
    alreadyChosenSet = set(alreadyChosen)
    return 1 <= number <= 9 and number not in alreadyChosenSet


def _validate_cube(array):
    flatten = []
    for row in array:
        for col in row:
            flatten.push(row[col])
    return hasAllNumbers(flatten)

def validate_rows(gridData):
    for row in range(0, 9):
        if not hasAllNumbers(gridData[row]):
            return False
    return True


def validate_cols(gridData):
    for col in range(0, 9):
        colData = []
        for row in range(0, 9):
            colData.append(gridData[row][col])
        if not hasAllNumbers(colData):
            return False

    return True

def validate_cubes(gridData):

    cubes = []
    for row in gridData:

        cube.append(row[:3])

    return True


def validate_sudoku_grid(gridData):
    return validate_rows(gridData) and validate_cols(gridData) and validate_cubes(gridData)


VALID_SUDOKU = \
    [[5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],

    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],

    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]]


import unittest

class HasNumbersTestCase(object):



    @classmethod
    def test_hasAllNumbers(cls):
        assert hasAllNumbers(range(1, 10))
        assert not hasAllNumbers(None)
        assert not hasAllNumbers([1,2])
        assert not hasAllNumbers(range(0,10))

    @staticmethod
    def test_valid_choice():
        assert not valid_choice(3, [3, 6])
        assert not valid_choice(10, [3, 6])
        assert valid_choice(5, [3, 6])

    @staticmethod
    def test_validate_sudoku():
        assert validate_sudoku_grid(VALID_SUDOKU)

        # self.assertFalse(hasAllNumbers([1,2, 3]))
        # self.assertFalse(hasAllNumbers([1,2]))
        # self.assertFalse(hasAllNumbers([1,2]))
        # self.assertFalse(hasAllNumbers([1,2]))
        # self.assertFalse(hasAllNumbers([1,2]))
        # self.assertFalse(hasAllNumbers([1,2]))



HasNumbersTestCase.test_hasAllNumbers()
HasNumbersTestCase.test_valid_choice()
HasNumbersTestCase.test_validate_sudoku()