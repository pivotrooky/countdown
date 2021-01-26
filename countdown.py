import json
import string
import random
import math
import os.path
from os import path

with open('english.json') as f:
  whole_dictionary = json.load(f)

dictionary = whole_dictionary.keys()

alphabet = set(string.ascii_lowercase)

letter_amount = 2

level_number = 0

#how many words you got right so far

score = 0
#your current total score

lost = False

possibilities = { "words": [], "maxLength": 0 }

def lose(current_word):
  global lost
  global possibilities
  global level_number
  global score

  lost = True

  if (not path.exists("highscore.txt")):
    with open('highscore.txt', 'w') as f:
      f.write(str(0))
      f.close()
  
  with open('highscore.txt') as f:
      high_score = int(f.read())
      f.close()

  long_possibility = random.choice(list(filter(lambda w: w != current_word and len(w) == possibilities["maxLength"], possibilities["words"])))

  msg = f'You could have gone with {long_possibility} :(... but unfortunately you lost, you got {level_number} words right and your final score is {score}'

  if (score > high_score):
    msg += "... which is now your new high score!"
    with open('highscore.txt', 'w') as f:
      f.write(str(score))
      f.close()
  
  print(msg)

def countdown():
  
  global level_number
  global letter_amount
  global score

  current_letters = []

  for i in range(letter_amount):
    letters_left = alphabet.difference(current_letters)
    current_letters.append(random.choice(list(letters_left)))

  letters_stringified = ' '.join(current_letters)

  #this checks if it is actually possible to answer the question.

  possibilities["words"] = []
  #this resets the words array

  possibilities["maxLength"] = 0
  #this resets the max posible length of a word that fits

  for word in dictionary:
    if (set(word).issuperset(current_letters)):
        if (len(word) > possibilities["maxLength"]):
          possibilities["maxLength"] = len(word)
        possibilities["words"].append(word)
  
  #checks all possible words that fit

  if (not possibilities["words"]):
    print("WAS IMPOSSIBLE TO SOLVE")
    countdown()
  #it's impossible to solve, then get a new pair of letters

  while(not lost):
    current_word = input(f'Please input a word that includes all the following letters. The longer the word, the more points you earn! {letters_stringified} \n').lower()

    if (current_word not in possibilities["words"]):
      return lose(current_word)
    for letter in current_letters:
      if (letter not in current_word):
        return lose(current_word)
        #get to next level

      if(lost):
         return

      another_choice = random.choice(list(filter(lambda w: w != current_word and len(w) == possibilities["maxLength"], possibilities["words"])))

      print(f'Good job! Another word you could have gone with is {another_choice}')

      letter_amount = 2 + math.floor(level_number**(1./3.))
      level_number += 1

      score += math.floor(len(current_word) ** letter_amount / 2)
      countdown()

countdown()