# start middle
echo "Starting Middleware.."
cd middle
npm run start > console.log 2>&1 &
middle_pid=$!
tail -f console.log &
tm_pid=$!
cd -

# start server
echo "Starting Server.."
cd server
NODE_ENV=development npm run start > console.log 2>&1 &
server_pid=$!
tail -f console.log &
ts_pid=$!
cd -

# start client
echo "Starting Client.."
cd client
npm run start > console.log 2>&1 &
client_pid=$!
tail -f console.log &
tc_pid=$!
cd -


echo "Press any key to stop..."
read -s -n1 key
kill -9 $tc_pid $client_pid $ts_pid $server_pid $tm_pid $middle_pid
