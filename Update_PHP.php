<?php
if ($_GET['run']) {
shell_exec("update.sh");
header('Location: https://www.74services.net/update');
}
?>