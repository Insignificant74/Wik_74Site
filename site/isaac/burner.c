#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include "json.c"
#include "json.h"

const char *read_file(const char *path)
{
    FILE *file = fopen(path, "r");
    if (file == NULL)
    {
        fprintf(stderr, "Expected file \"%s\" not found", path);
        return NULL;
    }
    fseek(file, 0, SEEK_END);
    long len = ftell(file);
    fseek(file, 0, SEEK_SET);
    char *buffer = malloc(len + 1);

    if (buffer == NULL)
    {
        fprintf(stderr, "Unable to allocate memory for file");
        fclose(file);
        return NULL;
    }

    fread(buffer, 1, len, file);
    buffer[len] = '\0';

    return (const char *)buffer;
}

int main(void)
{
    const char *json = read_file("0.json");
    const char *index = read_file("index.html");
    const char *article_start_locator = "!--Articles_Start-->";
    const char *article_end_locator = "!--Article_End-->";
    char *html = (char *)malloc(0);
    const char *side_images[] = {
        "../Assets/Half Head Statue.png",
        "../Assets/Dolphin.png",
        "../Assets/Palm Tree.png",
        "../Assets/Bust Statue.png",
        "../Assets/Sign.png"};

    // find article locator in index.html
    int i = 0, j = 0;
    while (j < strlen(article_start_locator))
    {
        if (i >= strlen(index))
        {
            printf("html file missing article locator comment, go fix it\n");
            return 0;
        }
        html = (char *)realloc(html, sizeof(char) * (i + 1));
        sprintf(html + strlen(html), "%c", index[i]);
        if (article_start_locator[j] == index[i])
        {
            j++;
        }
        else
        {
            j = 0;
        }
        i++;
    }

    // read json's
    for (int i = 1; json != NULL; i++)
    {
        clock_t start, end;
        start = clock();
        result(json_element) element_result = json_parse(json);
        end = clock();

        printf("Read time for %i.json %fs\n", i, (double)(end - start) / (double)CLOCKS_PER_SEC);

        free((void *)json);

        if (result_is_err(json_element)(&element_result))
        {
            typed(json_error) error = result_unwrap_err(json_element)(&element_result);
            fprintf(stderr, "Error parsing JSON: %s\n, go fix it", json_error_to_string(error));
            return -1;
        }
        typed(json_element) element = result_unwrap(json_element)(&element_result);
        // write article html
        sprintf(html + strlen(html), "<div class=\"ContentBlocks\">\n<div id=\"Article_%i\" class=\"Textbox TextLeft\">\n<h1>%s</h1>", i);
        //
        //
        //
        // dedeeedefseyfsfhebdheyddeededfb edvbebdebebdbdedeeedefseyfsfhebdheyddeededfb
        // edvbebdebebdbdedeeedefseyfsfhebdheyddeededfb edvbebdebebdbdedeeedefseyfsfhebdheyddeededfb
        // edvbebdebebdbdedeeedefseyfsfhebdheyddeededfb edvbebdebebdbdedeeedefseyfsfhebdheyddeededfb
        // edvbebdebebdbdedeeedefseyfsfhebdheyddeededfb edvbebdebebdbdedeeedefseyfsfhebdheyddeededfb
        // edvbebdebebdbdedeeedefseyfsfhebdheyddeededfb edvbebdebebdbdedeeedefseyfsfhebdheyddeededfb edvbebdebebdb
        //</div>
        //<img class="BlockImages ImageRight" src="../Assets/Half Head Statue.png" />
        //</div>

        json_free(&element);

        char i_str[128];
        sprintf(i_str, "%d", i);
        sprintf(i_str + strlen(i_str), ".json");
        json = read_file(i_str);
    }
    printf("Done / No more JSON's found (possibly missing one along the way, reorder them or add the missing one)\n");

    return 0;
}