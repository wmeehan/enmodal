!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.geobuf=e()}}(function(){return function e(t,r,n){function i(a,u){if(!r[a]){if(!t[a]){var f="function"==typeof require&&require;if(!u&&f)return f(a,!0);if(o)return o(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var s=r[a]={exports:{}};t[a][0].call(s.exports,function(e){var r=t[a][1][e];return i(r?r:e)},s,s.exports,e,t,r,n)}return r[a].exports}for(var o="function"==typeof require&&require,a=0;a<n.length;a++)i(n[a]);return i}({1:[function(e,t){"use strict";function r(e){P=2,S=Math.pow(10,6),V=null,M=[],w=[];var t=e.readFields(n,{});return M=null,t}function n(e,t,r){1===e?M.push(r.readString()):2===e?P=r.readVarint():3===e?S=Math.pow(10,r.readVarint()):4===e?i(r,t):5===e?o(r,t):6===e&&a(r,t)}function i(e,t){return t.type="FeatureCollection",t.features=[],e.readMessage(u,t)}function o(e,t){return t.type="Feature",e.readMessage(f,t)}function a(e,t){return e.readMessage(l,t)}function u(e,t,r){1===e?t.features.push(o(r,{})):13===e?w.push(d(r)):15===e&&c(r,t)}function f(e,t,r){1===e?t.geometry=a(r,{}):11===e?t.id=r.readString():12===e?t.id=r.readSVarint():13===e?w.push(d(r)):14===e?t.properties=c(r,{}):15===e&&c(r,t)}function l(e,t,r){1===e?t.type=m[r.readVarint()]:2===e?V=r.readPackedVarint():3===e?s(t,r,t.type):4===e?(t.geometries=t.geometries||[],t.geometries.push(a(r,{}))):13===e?w.push(d(r)):15===e&&c(r,t)}function s(e,t,r){"Point"===r?e.coordinates=p(t):"MultiPoint"===r?e.coordinates=y(t,!0):"LineString"===r?e.coordinates=y(t):"MultiLineString"===r?e.coordinates=h(t):"Polygon"===r?e.coordinates=h(t,!0):"MultiPolygon"===r&&(e.coordinates=v(t))}function d(e){for(var t=e.readVarint()+e.pos,r=null;e.pos<t;){var n=e.readVarint(),i=n>>3;1===i?r=e.readString():2===i?r=e.readDouble():3===i?r=e.readVarint():4===i?r=-e.readVarint():5===i?r=e.readBoolean():6===i&&(r=JSON.parse(e.readString()))}return r}function c(e,t){for(var r=e.readVarint()+e.pos;e.pos<r;)t[M[e.readVarint()]]=w[e.readVarint()];return w=[],t}function p(e){for(var t=e.readVarint()+e.pos,r=[];e.pos<t;)r.push(e.readSVarint()/S);return r}function g(e,t,r,n){var i,o,a=0,u=[],f=[];for(o=0;P>o;o++)f[o]=0;for(;r?r>a:e.pos<t;){for(i=[],o=0;P>o;o++)f[o]+=e.readSVarint(),i[o]=f[o]/S;u.push(i),a++}return n&&u.push(u[0]),u}function y(e){return g(e,e.readVarint()+e.pos)}function h(e,t){var r=e.readVarint()+e.pos;if(!V)return[g(e,r,null,t)];for(var n=[],i=0;i<V.length;i++)n.push(g(e,r,V[i],t));return V=null,n}function v(e){var t=e.readVarint()+e.pos;if(!V)return[[g(e,t,null,!0)]];for(var r=[],n=1,i=0;i<V[0];i++){for(var o=[],a=0;a<V[n];a++)o.push(g(e,t,V[n+1+a],!0));n+=V[n]+1,r.push(o)}return V=null,r}t.exports=r;var M,w,V,P,S,m=["Point","MultiPoint","LineString","MultiLineString","Polygon","MultiPolygon","GeometryCollection"]},{}],2:[function(e,t){"use strict";function r(e,t){w={},V=0,P=0,S=1,n(e),S=Math.min(S,m);for(var r=Math.ceil(Math.log(S)/Math.LN10),i=Object.keys(w),o=0;o<i.length;o++)t.writeStringField(1,i[o]);return 2!==P&&t.writeVarintField(2,P),6!==r&&t.writeVarintField(3,r),"FeatureCollection"===e.type?t.writeMessage(4,f,e):"Feature"===e.type?t.writeMessage(5,l,e):t.writeMessage(6,s,e),w=null,t.finish()}function n(e){var t,r;if("FeatureCollection"===e.type)for(t=0;t<e.features.length;t++)n(e.features[t]);else if("Feature"===e.type){n(e.geometry);for(r in e.properties)u(r)}else if("Point"===e.type)a(e.coordinates);else if("MultiPoint"===e.type)o(e.coordinates);else if("GeometryCollection"===e.type)for(t=0;t<e.geometries.length;t++)n(e.geometries[t]);else if("LineString"===e.type)o(e.coordinates);else if("Polygon"===e.type||"MultiLineString"===e.type)i(e.coordinates);else if("MultiPolygon"===e.type)for(t=0;t<e.coordinates.length;t++)i(e.coordinates[t]);for(r in e)M(r,e.type)||u(r)}function i(e){for(var t=0;t<e.length;t++)o(e[t])}function o(e){for(var t=0;t<e.length;t++)a(e[t])}function a(e){P=Math.max(P,e.length);for(var t=0;t<e.length;t++)for(;Math.round(e[t]*S)/S!==e[t]&&m>S;)S*=10}function u(e){void 0===w[e]&&(w[e]=V++)}function f(e,t){for(var r=0;r<e.features.length;r++)t.writeMessage(1,l,e.features[r]);d(e,t,!0)}function l(e,t){t.writeMessage(1,s,e.geometry),void 0!==e.id&&("number"==typeof e.id&&e.id%1===0?t.writeSVarintField(12,e.id):t.writeStringField(11,e.id)),e.properties&&d(e.properties,t),d(e,t,!0)}function s(e,t){t.writeVarintField(1,F[e.type]);var r=e.coordinates;if("Point"===e.type)p(r,t);else if("MultiPoint"===e.type)g(r,t,!0);else if("LineString"===e.type)g(r,t);else if("MultiLineString"===e.type)y(r,t);else if("Polygon"===e.type)y(r,t,!0);else if("MultiPolygon"===e.type)h(r,t);else if("GeometryCollection"===e.type)for(var n=0;n<e.geometries.length;n++)t.writeMessage(4,s,e.geometries[n]);d(e,t,!0)}function d(e,t,r){var n=[],i=0;for(var o in e)r&&M(o,e.type)||(t.writeMessage(13,c,e[o]),n.push(w[o]),n.push(i++));t.writePackedVarint(r?15:14,n)}function c(e,t){var r=typeof e;"string"===r?t.writeStringField(1,e):"boolean"===r?t.writeBooleanField(5,e):"object"===r?t.writeStringField(6,JSON.stringify(e)):"number"===r&&(e%1!==0?t.writeDoubleField(2,e):e>=0?t.writeVarintField(3,e):t.writeVarintField(4,-e))}function p(e,t){for(var r=[],n=0;P>n;n++)r.push(Math.round(e[n]*S));t.writePackedSVarint(3,r)}function g(e,t){var r=[];v(r,e),t.writePackedSVarint(3,r)}function y(e,t,r){var n,i=e.length;if(1!==i){var o=[];for(n=0;i>n;n++)o.push(e[n].length-(r?1:0));t.writePackedVarint(2,o)}var a=[];for(n=0;i>n;n++)v(a,e[n],r);t.writePackedSVarint(3,a)}function h(e,t){var r,n,i=e.length;if(1!==i||1!==e[0].length){var o=[i];for(r=0;i>r;r++)for(o.push(e[r].length),n=0;n<e[r].length;n++)o.push(e[r][n].length-1);t.writePackedVarint(2,o)}var a=[];for(r=0;i>r;r++)for(n=0;n<e[r].length;n++)v(a,e[r][n],!0);t.writePackedSVarint(3,a)}function v(e,t,r){var n,i,o=t.length-(r?1:0),a=new Array(P);for(i=0;P>i;i++)a[i]=0;for(n=0;o>n;n++)for(i=0;P>i;i++){var u=Math.round(t[n][i]*S)-a[i];e.push(u),a[i]+=u}}function M(e,t){if("type"===e)return!0;if("FeatureCollection"===t){if("features"===e)return!0}else if("Feature"===t){if("id"===e||"properties"===e||"geometry"===e)return!0}else if("GeometryCollection"===t){if("geometries"===e)return!0}else if("coordinates"===e)return!0;return!1}t.exports=r;var w,V,P,S,m=1e6,F={Point:0,MultiPoint:1,LineString:2,MultiLineString:3,Polygon:4,MultiPolygon:5,GeometryCollection:6}},{}],3:[function(e,t,r){"use strict";r.encode=e("./encode"),r.decode=e("./decode")},{"./decode":1,"./encode":2}]},{},[3])(3)});