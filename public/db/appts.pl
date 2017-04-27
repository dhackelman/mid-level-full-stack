#!/usr/bin/perl
use strict;
use warnings;

use DBI;

my $dbfile = "appointments.db";
my $dsn      = "dbi:SQLite:dbname=$dbfile";
my $dbh = DBI->connect($dsn);
my $sql = <<'END_SQL';

CREATE TABLE appointments (
  date    VARCHAR(8),
  time    VARCHAR(8),
  description VARCHAR(150)
)
END_SQL

# $dbh->do($sql);

my $date = '05/06/2017';
my $time = '12:15pm',
my $description  = 'Meet with people about the beach.';
$dbh->do('INSERT INTO appointments (date, time, description) VALUES (?, ?, ?)',
  undef,
  $date, $time, $description);


$dbh->disconnect;
