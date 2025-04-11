import EventEmitter from "events";
import { ElasticSearchService } from "../services/elasticsearch.service";

export interface EventPayload {
  event: "createProduct" | "updateProduct" | "deleteProduct";
  data: unknown;
}

export class AppEventListener extends EventEmitter {
  private static _instance: AppEventListener;

  private eventName: string = "ELASTIC_SEARCH_EVENT";
  private constructor() {
    super();
  }

  static get instance() {
    return this._instance || (this._instance = new AppEventListener());
  }

  notify(payload: EventPayload) {
    this.emit(this.eventName, payload);
  }

  listen(elasticSearchInstance: ElasticSearchService) {
    console.log("AppEventListener listen", elasticSearchInstance);
    this.on(this.eventName, (payload: EventPayload) => {
      elasticSearchInstance.handleEvents(payload);
    });
  }
}
