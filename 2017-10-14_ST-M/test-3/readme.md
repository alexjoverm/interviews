## Difficulties

The recursive call, how to do it with promises and how to finish it, where I opted for a callback.

## Improvements

- Progressive load of the data as it comes from the fetch

## Exercise: Movie Search

Write the JavaScript code to complete a simple movie title search app. The app need only support modern browsers, E52015 can be used.
When the form is submitted, use this API to fetch movie data:

https://jsonmock.hackerrank.com/api/movies/search/?Title=QUERY&page=PAGE

The search query should be used for the Title parameter.

The results are paginated, the 'page' parameter sets the current page. Make as many requests as necessary to fetch all matching movies when the form is submitted.
For example, searching for 'spiderman' will require 2 requests. Populate the unordered list below the form with a list oftitles in alphabetical order.

Sample response:

```json
{
  "page":1,
  "per_page":10,
  "total":13,
  "total_pages":2,
  "data":[{ "Poster":"", "Tit1e":"Italian Spiderman", "Type":"movie", "Year":2007, "imdD":"tt2705436" }]
}
```

### Run it:

Use `live-server` to run it (install it with `npm i -g live-server`)

