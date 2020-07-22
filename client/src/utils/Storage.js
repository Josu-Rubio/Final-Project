const LocalStorage = {
  saveLocalStorage: (session) => {
    if (session.name) {
      localStorage.setItem('wallaclone', JSON.stringify(session));
    }
  },

  readLocalStorage: () => {
    const session = localStorage.getItem('wallaclone');
    return JSON.parse(session);
  },

  cleanLocalStorage: () => {
    localStorage.clear();
  },
};

export default LocalStorage;
