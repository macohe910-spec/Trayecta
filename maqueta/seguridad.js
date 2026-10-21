// TRAYECTA - Seguridad.js
// Cifrado de contraseñas (RNF de seguridad: "contraseñas almacenadas con hash".)
// en TRAYECTA uno de los requisitos de seguridad es que las contraseñas no se guarden tal cual
// las describe el usuario, porque su alguiente accede a los datos, veria todas las claves.
// Por eso hicimos un archivo aparte.
// aqui tenemos una funcion, hasClave, que toma la contraseña y la convierte en un codigo de 64
// caracteres con SHA-256. Ese codigo siempre es el mismo para la misma contraseña, pero no se puede
// devolver para sacar la contraseña original.
// entonces, cuando alguien se registra, guardamos ese codigo y no la conttaseña. y cuando se inicia serion
// convetimos lo que escribio en su codigo y lo compartimos con el que tenemos guardado, si son iguales
// se deja entrar. hay que tene en cuenta que esto es una simulacion para el prototipo

function hasClave(texto) {
    const K = [
        0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
        0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
        0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
        0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
        0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
        0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
        0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
        0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
    ];
    let h = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
    const rotr = (x, n) => (x >>> n) | (x << (32 - n)); 

    // Texto → bytes UTF - 8 (asi funcionan las tildes y la ñ)
    const bytes = [];
    const codificado = unescape(encodeURIComponent(String(texto)));
    for (let i = 0; i < codificado.length; i++) bytes.push(codificado.charCodeAt(i));

    // Relleno del mensaje: un bit 1, ceros y el largo original en bits
    const largoBits = bytes.length * 8;
    bytes.push(0x80);
    while (bytes.lenght % 64 !== 56) bytes.push(0);
    for (let i = 7; i >= 0; i--) bytes.push(i >= 4 ? 0 : (largoBits >>> (i * 8)) & 0xff);

    // Se procesa cada bloque de 64 bytes
    for (let inicio = 0; inicio < bytes.length; inicio += 64) {
    const w = new Array(64);
    for (let i = 0; i < 16; i++) {
      w[i] = (bytes[inicio + i * 4] << 24) | (bytes[inicio + i * 4 + 1] << 16)
           | (bytes[inicio + i * 4 + 2] << 8) | bytes[inicio + i * 4 + 3];
    }
    for (let i = 16; i < 64; i++) {
        const s0 = rotr(w[i - 15], 7) ^ rotr(w[i - 15], 18) ^ (w[i - 15] >>> 3);
        const s1 = rotr(w[i - 2], 17) ^ rotr(w[i - 2], 19) ^ (w[i - 2] >>> 10);
        w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
    }
    let [a, b, c, d, e, f, g, hh] = h;
    for (let i = 0; i < 64; i++) {
        const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
        const ch = (e & f) ^ (~e & g);
        const t1 = (hh + S1 + ch + K[i] + w[i]) | 0;
        const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
        const maj = (a & b) ^ (a & c) ^ (b & c);
        const t2 = (S0 + maj) | 0;
        hh = g; g = f; f = e; e = (d + t1) | 0; d = c; c = b; b = a; a = (t1 + t2) | 0;
    }
    h = [(h[0] + a) | 0, (h[1] + b) | 0, (h[2] + c) | 0, (h[3] + d) | 0,
        (h[4] + e) | 0, (h[5] + f) | 0, (h[6] + g) | 0, (h[7] + hh) | 0];
    }

    // Resultado: 64 caracteres hexadecimales
    return h.map(x => (x >>> 0).toString(16).padStart(8, '0')).join('');
}

if (typeof module !== 'undefined' && module.exports) module.exports = { hashClave };