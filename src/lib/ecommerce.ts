export type DataObject = {
  ecommerce: {
    currencyCode: string;
  } & (ViewProduct | AddItemToBasket | RemoveItemFromBasket | Purchase);
};

export type SimpleActionType = keyof (ViewProduct & AddItemToBasket & RemoveItemFromBasket);

type ViewProduct = {
  detail: WithProducts;
};
type AddItemToBasket = {
  add: WithProducts;
};
type RemoveItemFromBasket = {
  remove: WithProducts;
};
export type Purchase = {
  purchase: {
    actionField: ActionField;
  } & WithProducts;
};

type WithProducts = {
  products: Product[];
};

export type Product = (
  | { id: string; name: string | undefined }
  | { id: string | undefined; name: string }
  | { id: string; name: string }
) & {
  /** The brand or trademark associated with the item. For example, "Yandex" */
  brand: UniversalAnalytics.FieldsObject['brand'];
  /**
   * The category the item belongs to.
   *
   * The hierarchy of categories supports up to 5 nesting levels. Use the / symbol to separate levels. For example, "Clothing/Men's clothing/T-shirts"
   */
  category: UniversalAnalytics.FieldsObject['category'];
  /** A promo code associated with the item. For example, "PARTNER_SITE_15" */
  coupon: UniversalAnalytics.FieldsObject['coupon'];
  /** Position of item in the list. For example, 2 */
  position: number | undefined;
  price: number | undefined;
  quantity: UniversalAnalytics.FieldsObject['quantity'];
  /** A variation of the item. For example, "Red" */
  variant: UniversalAnalytics.FieldsObject['variant'];
};

type ActionField = {
  id: string;
  coupon: Product['coupon'] | undefined;
  goal_id: number | undefined;
  revenue: number | undefined;
};

type _DataLayer = DataObject[];

/** @see https://yandex.com/support/metrica/ecommerce/data.html */
export function dataLayerPush(dataLayerName: string | null, ...args: DataObject[]): void {
  if (!dataLayerName) return;

  if (!(dataLayerName in window)) {
    console.error(
      `[next-yandex-metrica] window.${dataLayerName} is not defined. Make sure to use YandexMetricaProvider, and add 'ecommerce' field in initParameters`,
    );
    return;
  }

  const dataLayer = window[dataLayerName as keyof typeof window] as _DataLayer | undefined;

  if (!dataLayer) {
    return;
  }

  dataLayer.push(...args);
}
