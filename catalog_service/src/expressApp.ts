import express from "express";
import catalogRouter from "./api/catalog.routes";
import { HandleErrorWithLogger, httpLogger } from "./utils";
import { ElasticSearchService } from "./services/elasticsearch.service";
import { AppEventListener } from "./utils/AppEventListener";

const app = express();
app.use(express.json());

const elasticSearchService = new ElasticSearchService();
AppEventListener.instance.listen(elasticSearchService);

app.use(httpLogger);

app.use(catalogRouter);

app.use(HandleErrorWithLogger);

export default app;
