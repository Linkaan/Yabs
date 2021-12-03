FROM ruby:2.7.5

RUN echo 'deb http://httpredir.debian.org/debian buster-backports main contrib non-free' >> /etc/apt/sources.list.d/debian-backports.list

RUN apt update --allow-insecure-repositories
RUN apt install -y libseccomp2 -t buster-backports 
RUN apt install -y build-essential git libsqlite3-dev nodejs npm zsh python
RUN npm install -g yarn
RUN gem install ruby-debug-ide debase solargraph
RUN sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
RUN sed -i 's/➜/🐳/g' ~/.oh-my-zsh/themes/robbyrussell.zsh-theme


RUN apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY ./ /app
RUN  cd /app/backend && bundle install 
RUN  cd /app/frontend && yarn install