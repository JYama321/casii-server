FROM ruby:2.5.0
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -  && apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /casii
WORKDIR /casii
ADD ../Gemfile /casii/Gemfile
ADD ../Gemfile.lock /casii/Gemfile.lock
RUN bundle install
ADD ../* /casii