#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include "json.c"
#include "json.h"

char *read_file(const char *path, int whitespace)
{
  FILE *file = fopen(path, "r");
  if (file == NULL)
  {
    printf("Expected file \"%s\" not found\n", path);
    return NULL;
  }

  fseek(file, 0, SEEK_END);
  long len = ftell(file);
  fseek(file, 0, SEEK_SET);
  char *buffer = malloc(len + 1);

  if (buffer == NULL)
  {
    printf("Unable to allocate memory for file\n");
    fclose(file);
    return NULL;
  }

  if (whitespace)
  {
    fread(buffer, 1, len, file);
    buffer[len] = '\0';
  }
  else
  {
    int in_quote = 0;
    int offset = 0;
    char c;
    size_t i = 0;
    while ((c = fgetc(file)) != EOF)
    {
      switch (c)
      {
      case ' ':
      case '\n':
      case '\r':
      case '\t':
        if (!in_quote)
          offset++;
        else
          buffer[i++] = c;
        break;

      case '\"':
        if (!in_quote || buffer[i - 1] != '\\')
          in_quote = !in_quote;
        buffer[i++] = c;
        break;

      default:
        buffer[i++] = c;
        break;
      }
    }
    buffer = realloc(buffer, i);
  }
  return (char *)buffer;
}

int main(void)
{
  const char *sideImages[] = {
      "../Assets/Sign.png",
      "../Assets/Half Head Statue.png",
      "../Assets/Dolphin.png",
      "../Assets/Palm Tree.png",
      "../Assets/Bust Statue.png"};
  const char *article_start_locator = "<!--Articles_Start-->";
  const char *article_end_locator = "<!--Articles_End-->";
  const char *taskbar_start_locator = "<!--Taskbar_Articles_Start-->";
  const char *taskbar_end_locator = "<!--Taskbar_Articles_End-->";

  FILE *fptr = fopen("temp.html", "w");

  FILE *indexRead = fopen("index.html", "r");
  if (indexRead == NULL)
  {
    printf("index.html not found, WHAT DID YOU DO\n");
    return -1;
  }

  size_t j = 0;
  char c;
  while (j < strlen(article_start_locator))
  {
    if ((c = fgetc(indexRead)) == EOF)
    {
      printf("html file missing article locator comment, go fix it\n");
      return -1;
    }
    if (article_start_locator[j] == c)
    {
      j++;
    }
    else
    {
      j = 0;
    }
    fputc(c, fptr);
  }

  char *json = read_file("0.json", 0);
  for (int i = 1; json != NULL; i++)
  {
    clock_t start, end;
    start = clock();
    result(json_element) element_result = json_parse(json);
    end = clock();

    printf("Time taken %fs\n", (double)(end - start) / (double)CLOCKS_PER_SEC);

    free((void *)json);

    if (result_is_err(json_element)(&element_result))
    {
      typed(json_error) error = result_unwrap_err(json_element)(&element_result);
      printf("Error parsing JSON: %s\n", json_error_to_string(error));
      return -1;
    }
    typed(json_element) element = result_unwrap(json_element)(&element_result);

    result(json_element) t_element_result = json_object_find(element.value.as_object, "title");
    if (result_is_err(json_element)(&t_element_result))
    {
      typed(json_error) error = result_unwrap_err(json_element)(&t_element_result);
      printf("Error getting element \"title\": %s\n", json_error_to_string(error));
      return -1;
    }
    char *header = result_unwrap(json_element)(&t_element_result).value.as_string;

    t_element_result = json_object_find(element.value.as_object, "text");
    if (result_is_err(json_element)(&t_element_result))
    {
      typed(json_error) error = result_unwrap_err(json_element)(&t_element_result);
      printf("Error getting element \"text\": %s\n", json_error_to_string(error));
      return -1;
    }
    char *text = result_unwrap(json_element)(&t_element_result).value.as_string;

    fprintf(fptr, "\n<div class=\"ContentBlocks\">\n");
    if (i % 2)
    {
      fprintf(fptr, "<div id=\"Article_%i\" class=\"Textbox TextLeft\">\n<h1>%s</h1>\n%s\n</div>\n<img class=\"BlockImages ImageRight\" src=\"%s\"/>\n</div>\n", i, header, text, sideImages[i % (sizeof(sideImages) / sizeof(char))]);
    }
    else
    {
      fprintf(fptr, "<img class=\"BlockImages ImageLeft\" src=\"%s\"/>\n<div id=\"Article_%i\" class=\"Textbox TextRight\">\n<h1>%s</h1>\n%s\n</div>\n</div>\n", sideImages[i % (sizeof(sideImages) / sizeof(char))], i, header, text);
    }

    json_free(&element);

    char i_str[128];
    sprintf(i_str, "%d", i);
    sprintf(i_str + strlen(i_str), ".json");
    json = read_file(i_str, 0);
  }

  j = 0;
  while (j < strlen(article_end_locator))
  {
    if ((c = fgetc(indexRead)) == EOF)
    {
      printf("html file missing article end locator comment, go fix it\n");
      return -1;
    }
    if (article_end_locator[j] == c)
    {
      j++;
    }
    else
    {
      j = 0;
    }
  }

  fprintf(fptr, article_end_locator);

  j = 0;
  while (j < strlen(taskbar_start_locator))
  {
    if ((c = fgetc(indexRead)) == EOF)
    {
      printf("html file missing taskbar locator comment, go fix it\n");
      return -1;
    }
    if (taskbar_start_locator[j] == c)
    {
      j++;
    }
    else
    {
      j = 0;
    }
    fputc(c, fptr);
  }

  json = read_file("0.json", 0);
  for (int i = 1; json != NULL; i++)
  {
    clock_t start, end;
    start = clock();
    result(json_element) element_result = json_parse(json);
    end = clock();

    printf("Time taken %fs\n", (double)(end - start) / (double)CLOCKS_PER_SEC);

    free((void *)json);

    if (result_is_err(json_element)(&element_result))
    {
      typed(json_error) error = result_unwrap_err(json_element)(&element_result);
      printf("Error parsing JSON: %s\n", json_error_to_string(error));
      return -1;
    }
    typed(json_element) element = result_unwrap(json_element)(&element_result);

    result(json_element) t_element_result = json_object_find(element.value.as_object, "title");
    if (result_is_err(json_element)(&t_element_result))
    {
      typed(json_error) error = result_unwrap_err(json_element)(&t_element_result);
      printf("Error getting element \"title\": %s\n", json_error_to_string(error));
      return -1;
    }
    char *header = result_unwrap(json_element)(&t_element_result).value.as_string;

    t_element_result = json_object_find(element.value.as_object, "text");
    if (result_is_err(json_element)(&t_element_result))
    {
      typed(json_error) error = result_unwrap_err(json_element)(&t_element_result);
      printf("Error getting element \"text\": %s\n", json_error_to_string(error));
      return -1;
    }
    char *text = result_unwrap(json_element)(&t_element_result).value.as_string;

    fprintf(fptr, "\n<div id=\"Taskbar_Article_%i\" class=\"button is-active\">\n<div class=\"Internal\">%s</div>\n<div id=\"Article_Window_%i\" class=\"Window selected\" style=\"left: 400px; right: 400px; top: 200px; bottom: 200px;\">\n<div class=\"Window_TopLeftBorder\"></div>\n<div class=\"Window_TopBorder\"></div>\n<div class=\"Window_TopRightBorder\"></div>\n<div class=\"Window_LeftBorder\"></div>\n<div class=\"Window_Internal\">\n<div class=\"TitleBar\">\n%s\n<div class=\"TitleBar_Buttons\">\n<div class=\"button TitleBar_Minimise\"></div>\n<div class=\"button TitleBar_Maximise\"></div>\n<div class=\"button TitleBar_Close\"></div>\n</div>\n</div>\n<div class=\"Internal\">%s</div>\n</div>\n<div class=\"Window_RightBorder\"></div>\n<div class=\"Window_BottomLeftBorder\"></div>\n<div class=\"Window_BottomBorder\"></div>\n<div class=\"Window_BottomRightBorder\"></div>\n</div>\n</div>\n", i, header, i, header, text);

    json_free(&element);

    char i_str[128];
    sprintf(i_str, "%d", i);
    sprintf(i_str + strlen(i_str), ".json");
    json = read_file(i_str, 0);
  }

  j = 0;
  while (j < strlen(taskbar_end_locator))
  {
    if ((c = fgetc(indexRead)) == EOF)
    {
      printf("html file missing taskbar end locator comment, go fix it\n");
      return -1;
    }
    if (taskbar_end_locator[j] == c)
    {
      j++;
    }
    else
    {
      j = 0;
    }
  }

  fprintf(fptr, taskbar_end_locator);

  while ((c = fgetc(indexRead)) != EOF)
    fputc(c, fptr);

  fclose(fptr);
  fclose(indexRead);

  if (remove("index.html") == 0)
  {
    printf("Old index deleted successfully.\n");
    if (rename("temp.html", "index.html"))
    {
      printf("New index name changed successfully");
      printf("Great Success!\n");
    }
    else
    {
      printf("Failed to rename new index file");
    }
  }
  else
  {
    printf("Unable to delete new index file\n");
  }

  return 0;
}