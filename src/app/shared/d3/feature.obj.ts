import {FeatureProperties} from './feature.properties.obj';
import {Geometry} from './geometry.obj';

export interface Feature{
  type?:string,
  properties?:FeatureProperties,
  geometry?:Geometry
}
