import collections
import datetime
import json
import re
import subprocess

events = json.loads(subprocess.check_output(['gh', 'api', 'users/mchen04/events/public?per_page=100']))
hours = collections.defaultdict(collections.Counter)
for event in events:
    stamp = datetime.datetime.fromisoformat(event['created_at'].replace('Z', '+00:00'))
    hours[stamp.strftime('%Y-%m-%d %H:00')][event['repo']['name'].split('/')[-1]] += 1
rows = ''.join(
    f'<tr><th scope="row">{hour}</th><td>{sum(repos.values())}</td><td>{repos.most_common(1)[0][0]}</td></tr>\n'
    for hour, repos in sorted(hours.items()))
first, last = min(hours), max(hours)
today = datetime.date.today()
label = f'{today:%B} {today.day}, {today.year}'

path = 'projects/index.html'
html = open(path).read()
html = re.sub(r'(<tbody id="wire-rows">\n).*?(</tbody>)', lambda m: m.group(1) + rows + m.group(2), html, flags=re.S)
html = re.sub(r'This dated sample is from [A-Z][a-z]+ \d+, \d{4}\.', f'This dated sample is from {label}.', html)
html = re.sub(r'Cached sample from [^<]*', f'Cached sample from {label} · {len(events)} events · {first} to {last} UTC', html)
open(path, 'w').write(html)
print(len(events), 'events,', len(hours), 'hours,', first, 'to', last)
