# Worker-Example-Node

## Go to path before/
Run this server module with node:
<br />``node httpServer.js``

When our server starts, the console will display the following:
<br />**Output**
<br />``Server is running on http://localhost:8000``

Now, to test the performance of our module, open two additional terminals. In the first terminal, use the curl command to make a request to the ``/total ``endpoint, which we expect to be slow:
<br />``curl http://localhost:8000/total``

In the other terminal, use curl to make a request to the ``/hello`` endpoint like this:
<br />``curl http://localhost:8000/hello``

The first request will return the following JSON:
<br />**Output**
<br />``{"totalCount":5000000000}``

Whereas the second request will return this JSON:
<br />**Output**
<br />``{"message":"hello"}``

The request to /hello completed only after the request to ``/total``. The slowFunction() blocked all other code from executing while it was still in its loop. You can verify this by looking at the Node.js server output that was logged in your original terminal:
<br />**Output**
<br />``Returning /total results``
<br />``Returning /hello results``

## Go to path after/
To test the improvement using ``new Worker`` made on HTTP server, begin by executing the ``httpServer.js`` file with node:
<br />``node httpServer.js``

Like before, it will output the following message when it launches:
<br />**Output**
<br />``Server is running on http://localhost:8000``

To test the server, we will need an additional two terminals as we did the first time. You can re-use them if they are still open.

In the first terminal, use the curl command to make a request to the ``/total`` endpoint, which takes a while to compute:
<br />``curl http://localhost:8000/total``

In the other terminal, use curl to make a request to the ``/hello`` endpoint, which responds in a short time:
<br />``curl http://localhost:8000/hello``

The first request will return the following JSON:
<br />**Output**
<br />``{"totalCount":5000000000}``

Whereas the second request will return this JSON:
<br />**Output**
<br />``{"message":"hello"}``

Unlike the first time we tried this, the second request to ``/hello`` runs immediately. You can confirm by reviewing the logs, which will look like this:
<br />**Output**
<br />``Returning /hello results``
<br />``Returning /total results``

These logs show that the request for the ``/hello`` endpoint ran after the worker process was created but before the worker process had finished its task.

Since we moved the blocking code in a worker process using ``new Worker``, the server was still able to respond to other requests and execute other JavaScript code. Because of the ``new Worker`` function’s message passing ability, we can control when a worker process begins an activity.
