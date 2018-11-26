# ganache-bug

bug with ganache-cli

## Reproduce

1. `git clone https://github.com/tsuberim/ganache-bug.git`
2. `npm install`
3. `npm run ganache` - start ganache command in one terminal tab for the first time (creating db directory `./asdf`)
4. `node crash.js` - run a simple script in another tab sending 1 ether to an account.
5. Stop ganache.
6. `npm run ganache` - start ganache again (now using existing db).
7. `node crash.js` - run simple script again.
8. The script fails with:
   ```
   Error: Returned error: the tx doesn't have the correct nonce. account has nonce of: 0 tx has nonce of: 1
   at Object.ErrorResponse (/home/tsuberim/projects/ganache-test/node_modules/web3-core-helpers/src/errors.js:29:16)
   at /home/tsuberim/projects/ganache-test/node_modules/web3-core-requestmanager/src/index.js:140:36
   at XMLHttpRequest.request.onreadystatechange (/home/tsuberim/projects/ganache-test/node_modules/web3-providers-http/src/index.js:91:13)
   at XMLHttpRequestEventTarget.dispatchEvent (/home/tsuberim/projects/ganache-test/node_modules/xhr2-cookies/dist/xml-http-request-event-target.js:34:22)
   at XMLHttpRequest._setReadyState (/home/tsuberim/projects/ganache-test/node_modules/xhr2-cookies/dist/xml-http-request.js:208:14)
   at XMLHttpRequest._onHttpResponseEnd (/home/tsuberim/projects/ganache-test/node_modules/xhr2-cookies/dist/xml-http-request.js:318:14)
   at IncomingMessage.<anonymous> (/home/tsuberim/projects/ganache-test/node_modules/xhr2-cookies/dist/xml-http-request.js:289:61)
   at IncomingMessage.emit (events.js:187:15)
   at endReadableNT (_stream_readable.js:1094:12)
   at process._tickCallback (internal/process/next_tick.js:63:19)
   ```
9. If using `nonce: 0`, ganache fails with:
   ```
   TypeError: Cannot read property 'pop' of undefined
   at CheckpointTrie.Trie._updateNode (/home/tsuberim/projects/ganache-test/node_modules/ganache-cli/node_modules/ganache-core/node_modules/merkle-patricia-tree/baseTrie.js:360:24)
   at /home/tsuberim/projects/ganache-test/node_modules/ganache-cli/node_modules/ganache-core/node_modules/merkle-patricia-tree/baseTrie.js:107:16
   at /home/tsuberim/projects/ganache-test/node_modules/ganache-cli/node_modules/ganache-core/node_modules/merkle-patricia-tree/baseTrie.js:461:14
   at processNode (/home/tsuberim/projects/ganache-test/node_modules/ganache-cli/node_modules/ganache-core/node_modules/merkle-patricia-tree/baseTrie.js:471:23)
   at /home/tsuberim/projects/ganache-test/node_modules/ganache-cli/node_modules/ganache-core/node_modules/merkle-patricia-tree/baseTrie.js:457:5
   at /home/tsuberim/projects/ganache-test/node_modules/ganache-cli/node_modules/ganache-core/node_modules/merkle-patricia-tree/baseTrie.js:180:7
   at /home/tsuberim/projects/ganache-test/node_modules/ganache-cli/node_modules/ganache-core/node_modules/merkle-patricia-tree/util.js:75:7
   at /home/tsuberim/projects/ganache-test/node_modules/ganache-cli/node_modules/ganache-core/node_modules/merkle-patricia-tree/node_modules/async/lib/async.js:52:16
   at /home/tsuberim/projects/ganache-test/node_modules/ganache-cli/node_modules/ganache-core/node_modules/merkle-patricia-tree/node_modules/async/lib/async.js:269:32
   at /home/tsuberim/projects/ganache-test/node_modules/ganache-cli/node_modules/ganache-core/node_modules/merkle-patricia-tree/node_modules/async/lib/async.js:44:16
   at /home/tsuberim/projects/ganache-test/node_modules/ganache-cli/node_modules/ganache-core/node_modules/merkle-patricia-tree/util.js:71:7
   at /home/tsuberim/projects/ganache-test/node_modules/ganache-cli/node_modules/ganache-core/node_modules/merkle-patricia-tree/baseTrie.js:157:9
   at /home/tsuberim/projects/ganache-test/node_modules/ganache-cli/node_modules/ganache-core/lib/database/levelupobjectadapter.js:41:16
   at /home/tsuberim/projects/ganache-test/node_modules/ganache-cli/node_modules/ganache-core/node_modules/level-sublevel/shell.js:101:15
   at /home/tsuberim/projects/ganache-test/node_modules/ganache-cli/node_modules/ganache-core/node_modules/level-sublevel/nut.js:121:19
   at /home/tsuberim/projects/ganache-test/node_modules/ganache-cli/node_modules/ganache-core/node_modules/encoding-down/index.js:51:21
   at /home/tsuberim/projects/ganache-test/node_modules/ganache-cli/node_modules/ganache-core/node_modules/cachedown/index.js:58:21
   at ReadFileContext.callback (/home/tsuberim/projects/ganache-test/node_modules/ganache-cli/node_modules/ganache-core/lib/database/filedown.js:26:14)
   at FSReqWrap.readFileAfterOpen [as oncomplete] (fs.js:235:13)
   ```

**Note: The script succeeds when not restarting ganache midway.**
