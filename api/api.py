import pandas as pd
import random
from flask import Flask, render_template, request, json

movies = pd.read_csv('movies_summaries.csv',
                     usecols=['title', 'genres', 'summary'])
# ratings = pd.read_csv('/Users/Jai/Downloads/ml-25m/ratings.csv', usecols=['movieId', 'rating'])
# print(movies.tail(), movies.shape)

user_preferences = ["none", "none", "none"]
done_indexes = []
first_counter = 10
second_counter = 5
third_counter = 3
endless_stopper = 50

liked_movies = []

current_pick = ""

p = 0
m = []
i = 0

'''
for i in range(len(movies) - 1):
    if movies.genres[i] == "(no genres listed)":       # code was used to remove the NaN genre movies (~5000)
        movies = movies.drop(i)
'''


def pick_movie():
    global first_counter
    global second_counter
    global third_counter
    global endless_stopper
    global done_indexes
    global user_preferences
    global liked_movies
    global current_pick
    global p
    global m
    global i

    pref_num = 3 - (user_preferences.count("none"))

    index_pick = random.randint(0, len(movies) - 1)
    if pref_num != 0:
        has_no_first = not (
            movies.genres[index_pick].__contains__(user_preferences[0]))
        has_no_second = not (
            movies.genres[index_pick].__contains__(user_preferences[1]))
        has_no_third = not (
            movies.genres[index_pick].__contains__(user_preferences[2]))

        while ((has_no_first and user_preferences[0] != 'none') or (
                has_no_second and user_preferences[1] != 'none') or ((
                                                                             has_no_third and
                                                                             user_preferences[
                                                                                 2] != 'none') and (
                                                                             random.random() > 0.6))) or (
                index_pick in done_indexes):
            index_pick = random.randint(0, len(movies) - 1)

            has_no_first = not (
                movies.genres[index_pick].__contains__(user_preferences[0]))
            has_no_second = not (
                movies.genres[index_pick].__contains__(user_preferences[1]))
            has_no_third = not (
                movies.genres[index_pick].__contains__(user_preferences[2]))
            endless_stopper -= 1
            if len(done_indexes) == len(movies.genres):
                print("Out of movies! Resetting...")
                print()
                done_indexes = []
                user_preferences = ["none", "none", "none"]
            if endless_stopper == 0:
                user_preferences = ["none", "none", "none"]
                endless_stopper = 50

    movie_genre = movies.genres[index_pick].rsplit("|")
    done_indexes.append(index_pick)

    # print(movies.summary[index_pick])
    # print(movie_genre)
    # user_rating = input("Do you like this movie? Answer y/n: ")
    # print()
    current_pick = movies.summary[index_pick]

    p = pref_num
    m = movie_genre
    i = index_pick
    # rate_movie(user_rating, pref_num, movie_genre, index_pick)


def rate_movie(user_rating, pref_num, movie_genre, index_pick):
    global first_counter
    global second_counter
    global third_counter
    global endless_stopper
    global done_indexes
    global user_preferences
    global liked_movies
    global current_pick

    if user_rating == 'y':
        if pref_num == 0:
            user_preferences[0] = random.choice(movie_genre)
        elif pref_num == 1 and random.random() < 0.5 and len(movie_genre) >= 2:
            movie_genre.remove(user_preferences[0])
            user_preferences[1] = random.choice(movie_genre)
        elif pref_num == 2 and random.random() < 0.3 and len(movie_genre) >= 3:
            movie_genre.remove(user_preferences[0])
            movie_genre.remove(user_preferences[1])
            user_preferences[2] = random.choice(movie_genre)

        liked_movies.append(movies.title[index_pick])

    elif user_rating == 'n':
        if pref_num == 1:
            first_counter -= 1
            if first_counter == 0:
                user_preferences[0] = "none"
                first_counter = 10
        elif pref_num == 2:
            second_counter -= 1
            if second_counter == 0:
                user_preferences[1] = "none"
                second_counter = 5
        elif pref_num == 3:
            third_counter -= 1
            if third_counter == 0:
                user_preferences[2] = "none"
                third_counter = 3

    # print(user_preferences)
    # print(first_counter, second_counter, third_counter)
    # print(liked_movies)

    pick_movie()


pick_movie()

app = Flask(__name__)


@app.route('/api', methods=['GET'])
def index():
    print current_pick
    return {'data': [{
        "summary": current_pick
    }]}
    # return current_pick


@app.route('/api/create', methods=['POST'])
def create():
    print request.data
    userIn = ''
    if request.data == 'left':
        userIn = 'n'
    else:
        userIn = 'y'
    rate_movie(userIn, p, m, i)
    return {'data': [{
        "summary": current_pick
    }]}

    # rate_movie(user_rating, pref_num, movie_genre, index_pick)


if __name__ == '__main__':
    app.run(debug=True)
