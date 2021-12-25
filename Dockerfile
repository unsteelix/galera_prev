FROM node:16-alpine3.14
WORKDIR /app
COPY . .

ENV \
  RUSTUP_HOME="/usr/local/rustup" \
  CARGO_HOME="/usr/local/cargo" \
  PATH="/usr/local/cargo/bin:$PATH"

RUN \
  apk update && apk upgrade && \
  apk --update --no-cache add \
    autoconf \
    automake \
    binutils \
    brotli \
    build-base \
    cmake \
    curl \
    findutils \
    git \
    glib-dev \
    gobject-introspection-dev \
    gperf \
    gtk-doc \
    intltool \
    jq \
    libtool \
    linux-headers \
    nasm \
    ninja \
    python3 \
    py3-pip \
    shared-mime-info \
    texinfo \
    && \
  apk --update --no-cache --repository https://alpine.global.ssl.fastly.net/alpine/edge/community/ add advancecomp && \
  curl -Ls https://github.com/lovell/aarch64-linux-musl-crosstools/archive/main.tar.gz | tar -hxzC / --strip-components=2 && \
  ln -s /usr/bin/pkg-config /bin/aarch64-linux-musl-pkg-config && \
  curl https://sh.rustup.rs -sSf | sh -s -- -y \
    --no-modify-path \
    --profile minimal \
    --default-toolchain nightly \
    && \
  rustup target add aarch64-unknown-linux-musl && \
  pip3 install meson

# Compiler settings
ENV \
  PKG_CONFIG="/bin/aarch64-linux-musl-pkg-config" \
  PLATFORM="linuxmusl-arm64v8" \
  CHOST="aarch64-linux-musl" \
  RUST_TARGET="aarch64-unknown-linux-musl" \
  FLAGS="-march=armv8-a" \
  MESON="--cross-file=/root/meson.ini"

# Musl defaults to static libs but we need them to be dynamic for host toolchain.
# The toolchain will produce static libs by default.
# We also need to add the directory containing libc.a to the library search path.
ENV \
  RUSTFLAGS="-Ctarget-feature=-crt-static -Lnative=/aarch64-linux-musl/lib"

COPY Toolchain.cmake /root/
COPY meson.ini /root/


RUN npm install --global --force yarn
RUN yarn install
RUN yarn build
CMD ["yarn", "start"]
