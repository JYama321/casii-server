FROM ruby:2.5.0
RUN apt-get update -qq && \
    curl --silent --location https://deb.nodesource.com/setup_8.x | bash - && \
    apt-get install -y build-essential \
                       default-libmysqlclient-dev \
                       nodejs
RUN mkdir /sc_casino
WORKDIR /sc_casino
ADD ./Gemfile /sc_casino/Gemfile
ADD ./Gemfile.lock /sc_casino/Gemfile.lock
RUN bundle install
ADD ./ /sc_casino

RUN mkdir -p tmp/sockets