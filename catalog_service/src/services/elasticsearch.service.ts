import { Client } from "@elastic/elasticsearch";
import { EventPayload } from "../utils/AppEventListener";

export class ElasticSearchService {
  private indexName = "product";
  private client: Client;

  constructor() {
    this.client = new Client({
      node: process.env.ELASTICSEARCH_URL || "http://localhost:9200",
    });
  }

  async handleEvents({ event, data }: EventPayload) {
    console.log("ElasticSearchService handleEvents", event, data);
    switch (event) {
      case "createProduct":
        await this.createProduct(data);
        break;
      case "updateProduct":
        await this.updateProduct(data);
        break;
      case "deleteProduct":
        const { id } = data as { id: string };
        await this.deleteProduct(id.toString());
        break;
      default:
        console.log("Unknown event type", event);
    }
  }

  async createIndex() {
    const indexExist = await this.client.indices.exists({
      index: this.indexName,
    });
    if (!indexExist) {
      await this.client.indices.create({
        index: this.indexName,
        body: {
          mappings: {
            properties: {
              id: { type: "keyword" },
              title: { type: "text" },
              description: { type: "text" },
              price: { type: "float" },
              stock: { type: "integer" },
            },
          },
        },
      });
    }
  }

  async getProduct(id: number) {
    const response = await this.client.get({
      index: this.indexName,
      id: id.toString(),
    });
    return response._source;
  }

  async createProduct(data: any) {
    const response = await this.client.index({
      index: this.indexName,
      id: data.id,
      document: data,
    });
    return response;
  }

  async updateProduct(data: any) {
    const response = await this.client.update({
      index: this.indexName,
      id: data.id,
      doc: data,
    });
    return response;
  }

  async deleteProduct(id: string) {
    const response = await this.client.delete({
      index: this.indexName,
      id,
    });
    return response;
  }

  async searchProducts(query: string) {
    const response = await this.client.search({
      index: this.indexName,
      query: {
        multi_match: {
          query,
          fields: ["title", "description"],
          fuzziness: "AUTO",
        },
      },
    });
    return response.hits.hits.map((hit) => hit._source);
  }
}
