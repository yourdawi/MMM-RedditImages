Module.register("MMM-RedditImages", {
  defaults: {
    subreddit: "EarthPorn",
    updateInterval: 60000,
    imageWidth: "200px" 
  },

  start: function() {
    this.getData();
    this.scheduleUpdate();
  },

  getData: function() {
    this.sendSocketNotification("GET_REDDIT_IMAGES", this.config.subreddit);
  },

  scheduleUpdate: function() {
    setInterval(() => {
      this.getData();
    }, this.config.updateInterval);
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === "REDDIT_IMAGES") {
      this.images = payload;
      this.updateDom();
    }
  },

  getDom: function() {
    const wrapper = document.createElement("div");
    if (this.images) {
      const img = document.createElement("img");
      img.src = this.images[Math.floor(Math.random() * this.images.length)];
      img.style.width = this.config.imageWidth; 
      img.style.height = "auto";
      wrapper.appendChild(img);
    }
    return wrapper;
  }
});
