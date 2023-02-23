export type AddressType = {
  features: FeatureAddress[];
  type: string;
  query: string[];
};

type FeatureAddress = {
  id: string;
  place_type: string[];
  text_es: string;
  place_name_es: string;
  text: string;
  center: string[];
  address: string;
  context: ContextType[];
};

type ContextType = {
  id: string;
  text: string;
  text_es: string;
  wikidata?: string;
};
