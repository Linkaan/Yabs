FROM ruby:2.7.5

# ADD backports
RUN echo 'deb http://httpredir.debian.org/debian buster-backports main contrib non-free' >> /etc/apt/sources.list.d/debian-backports.list

# Add GH-CLI REPO
RUN curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
RUN echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" >> /etc/apt/sources.list.d/github-cli.list

# --allow-insecure-repositories since I could not get key to work for backports
RUN apt update --allow-insecure-repositories
# Install backport
RUN apt install -y libseccomp2 -t buster-backports 
# Install gh cli build-tools, git, sqlite, node, npm, zsh, python
RUN apt install -y gh build-essential git libsqlite3-dev nodejs npm zsh python
# Install Yarn
RUN npm install -g yarn
# Install gems for VS Code integration
RUN gem install ruby-debug-ide debase solargraph

# Install oh-my-zsh
RUN sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
# Replace arrow in default theme to (docker) whale
RUN sed -i 's/➜/🐳/g' ~/.oh-my-zsh/themes/robbyrussell.zsh-theme

# Clean up installations
RUN apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

# Set /app as workdir
WORKDIR /app

# Copy source code to workdir
COPY ./ /app

# Required for pre-commit hooks
RUN cd /app && yarn install

# Install backend gems
RUN cd /app/backend && bundle install 
# Install frontend node modules
RUN cd /app/frontend && yarn install