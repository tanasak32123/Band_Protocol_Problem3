
# Problem 3: Transaction Broadcasting and Monitoring Client

This project is the client module that interacts with an HTTP server. It is enable the broadcasting of a transaction and subsequently monitor its status until finalization.


## Tech Stack

**Client:** NextJS, TailwindCSS


## Run Locally

Go to the project directory

```bash
  cd <project_name>
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`BACKEND_URL=https://mock-node-wgqbnxruha-as.a.run.app`



## Documentation

For handling each transaction status, my strategy is use setInteval() function that fetch data of the transaction every 1 second so the data will updated every 1 second. On transaction pending, the button that use to click for broadcast will show text "pending" to let client know that transaction is pending until it is finish. When transaction confirmed or failed, the alert will show up at the top of the page.


## Authors

- [@tanasak32123](https://www.github.com/tanasak32123)

