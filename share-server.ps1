# CyberShield Wi-Fi Sharing Server (Listens on 0.0.0.0:8088)
$port = 8088
$root = $PSScriptRoot

$ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -notlike "*Loopback*" -and $_.IPAddress -notlike "169.254*" } | Select-Object -First 1).IPAddress

$listener = New-Object System.Net.Sockets.TcpListener ([System.Net.IPAddress]::Any, $port)
$listener.Start()

Write-Host "=========================================================="
Write-Host "CyberShield Wi-Fi Sharing Server Active!"
Write-Host "Local:   http://localhost:$port/"
Write-Host "Network: http://$($ip):$port/"
Write-Host "=========================================================="

while ($true) {
    $client = $listener.AcceptTcpClient()
    [System.Threading.ThreadPool]::QueueUserWorkItem({
        param($cli)
        $mimes = @{
            ".html" = "text/html; charset=utf-8";
            ".htm"  = "text/html; charset=utf-8";
            ".css"  = "text/css; charset=utf-8";
            ".js"   = "application/javascript; charset=utf-8";
            ".json" = "application/json; charset=utf-8";
            ".svg"  = "image/svg+xml";
            ".png"  = "image/png";
            ".jpg"  = "image/jpeg";
            ".ico"  = "image/x-icon"
        }
        try {
            $stream = $cli.GetStream()
            $reader = New-Object System.IO.StreamReader($stream)
            $line = $reader.ReadLine()
            if ($line) {
                $parts = $line.Split(' ')
                $urlPath = $parts[1].TrimStart('/')
                if ([string]::IsNullOrEmpty($urlPath) -or $urlPath -eq "/") {
                    $urlPath = "index.html"
                }

                if ($urlPath.Contains('?')) {
                    $urlPath = $urlPath.Substring(0, $urlPath.IndexOf('?'))
                }

                $filePath = [System.IO.Path]::Combine($using:root, $urlPath.Replace('/', [System.IO.Path]::DirectorySeparatorChar))

                if (Test-Path $filePath -PathType Leaf) {
                    $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
                    $mime = "application/octet-stream"
                    if ($mimes.ContainsKey($ext)) {
                        $mime = $mimes[$ext]
                    }

                    $bytes = [System.IO.File]::ReadAllBytes($filePath)
                    $header = "HTTP/1.1 200 OK`r`nContent-Type: $mime`r`nContent-Length: $($bytes.Length)`r`nAccess-Control-Allow-Origin: *`r`nConnection: close`r`n`r`n"
                    $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
                    $stream.Write($headerBytes, 0, $headerBytes.Length)
                    $stream.Write($bytes, 0, $bytes.Length)
                } else {
                    $notFound = [System.Text.Encoding]::UTF8.GetBytes("HTTP/1.1 404 Not Found`r`nContent-Length: 9`r`n`r`nNot Found")
                    $stream.Write($notFound, 0, $notFound.Length)
                }
            }
            $stream.Flush()
            $cli.Close()
        } catch {}
    }, $client) | Out-Null
}
