import {Feature} from './feature.obj';
import * as d3 from 'd3';
export interface GeoData{
  type?:string,
  features?:d3.GeoPermissibleObjects[],
  path?:any
}
