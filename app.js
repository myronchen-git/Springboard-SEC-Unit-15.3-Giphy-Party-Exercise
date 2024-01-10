$(document).ready(() => {
  new GiphyPartyApp();
});

class GiphyPartyApp {
  static giphyApiKey = "zHfDJnPpJz9eeMNhhPmuSjojQ06w3rw7";

  constructor() {
    $("#form-search").submit(this.handleSubmit.bind(this));
  }

  handleSubmit(e) {
    e.preventDefault();
    const searchTerm = $("#input-search").val();
    const imageUrl = this.searchGif(searchTerm);
    $("#input-search").val("");
  }

  async searchGif(searchTerm) {
    try {
      const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
        params: { api_key: GiphyPartyApp.giphyApiKey, q: searchTerm, limit: 1 },
      });

      console.log(response);
      console.log(response.data.data[0].embed_url);

      return response.data.data[0].embed_url;
    } catch (e) {
      console.log("Error when contacting giphy:\n", e);
      return "";
    }
  }
}
