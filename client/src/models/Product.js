export default class Product {
  constructor(ad, apiUrl) {
    this._id = ad._id;
    this.slug = ad.slug;
    this.createdAt = ad.createdAt;
    this.updatedAt = ad.updatedAt;
    this.name = ad.name;
    this.description = ad.description;
    this.price = ad.price;
    this.type = ad.type;
    this.img = ad.img.startsWith('/images/')
      ? `${apiUrl.replace('apiv1', '')}${ad.img}`
      : ad.img;
    if (ad.thumbnail) {
      this.thumbnail = ad.thumbnail.startsWith('/images/')
        ? `${apiUrl.replace('apiv1', '')}${ad.thumbnail}`
        : ad.thumbnail;
    }
    this.tags = ad.tags;
    this.booked = ad.booked;
    this.sold = ad.sold;
    this.user = ad.user;
  }

  isValid() {
    return (
      this.name &&
      this.description &&
      this.price > 0 &&
      this.type &&
      this.img &&
      this.tags &&
      this.tags.length >= 1
    );
  }

  static emptyProduct() {
    return {
      _id: '',
      slug: '',
      createdAt: Date.now(),
      name: '',
      description: '',
      price: 0,
      type: PRODUCT_CONSTANTS.TYPE.BUY,
      img: '',
      thumbnail: '',
      booked: false,
      sold: false,
      tags: [],
    };
  }
}

export const PRODUCT_CONSTANTS = {
  TYPE: {
    ALL: 'all',
    BUY: 'buy',
    SELL: 'sell',
  },
  TAG: {
    ALL: 'all',
    WORK: 'work',
    LIFESTYLE: 'lifestyle',
    MOTOR: 'motor',
    ELECTRONICS: 'electronics',
  },
};
