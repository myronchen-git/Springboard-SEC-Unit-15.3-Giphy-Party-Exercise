$(document).ready(() => {
  new GiphyPartyApp();
});

class GiphyPartyApp {
  static giphyApiKey = "zHfDJnPpJz9eeMNhhPmuSjojQ06w3rw7";

  constructor() {
    $("#form-search").submit(this.handleSubmit.bind(this));
    $("#button-remove").on("click", this.handleRemove.bind(this));
  }

  async handleSubmit(e) {
    e.preventDefault();
    const searchTerm = $("#input-search").val();
    const imageUrl = await this.searchGif(searchTerm);
    $("#input-search").val("");
    this.appendGif(imageUrl);
  }

  handleRemove(e) {
    $("#area-gif").html("");
  }

  async searchGif(searchTerm) {
    try {
      const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
        params: { api_key: GiphyPartyApp.giphyApiKey, q: searchTerm, limit: 1 },
      });
      return response.data.data[0].images.original.url;
    } catch (e) {
      console.log("Error when contacting giphy:\n", e);
      return "";
    }
  }

  appendGif(imageUrl) {
    $("#area-gif").append($("<img>").attr("src", imageUrl).addClass("m-2"));
  }
}
