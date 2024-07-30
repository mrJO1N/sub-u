const cookieService = new (class {
  setData(data: { [key: string]: string }) {
    const key = Object.keys(data)[0];
    document.cookie +=
      encodeURIComponent(key) + "=" + encodeURIComponent(data[key]) + ";";
  }
  findData(key: string) {
    let matches = document.cookie.match(
      new RegExp(
        "(?:^|; )" +
          key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
          "=([^;]*)"
      )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  clear() {
    document.cookie = "";
  }
})();

export default cookieService;
