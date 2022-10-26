function randomGaussian() {
  const u = 1 - Math.random();
  const v = Math.random();
  return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}


export function evolveObject (obj, stdDev) {
  console.log(obj)
  var out = {...obj}
  for (const [k,v] of Object.entries(obj)){
    out[k] = v + randomGaussian() * stdDev;
  }
  return obj;
}